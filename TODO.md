# Diagnóstico Técnico — Antecessum OR

## Visão Geral

O projeto possui 8 templates HTML, 10 arquivos CSS e 1 arquivo JS. A análise identificou **5 categorias de problemas**, descritas abaixo com a causa, o impacto e a correção recomendada para cada uma.

---

## 1. Arquitetura CSS — Duplicação massiva de estilos

### O problema
Classes com o mesmo nome e mesma função foram redefinidas em múltiplos arquivos. Exemplos encontrados no código:

| Classe | Arquivos onde aparece |
|---|---|
| `.header` | `alertas.css`, `cancela_procedimento.css`, `registrar_observacoes.css` |
| `.section-title` | `alertas.css`, `cancela_procedimento.css`, `detalhes_cirurgia.css` |
| `.avatar` | `alertas.css`, `detalhes_cirurgia.css` |
| `.clock` | `alertas.css`, `detalhes_cirurgia.css`, `salas.css` |
| `.check-circle` | `alertas.css`, `registrar_observacoes.css` |
| `.content` | `cancela_procedimento.css`, `registrar_observacoes.css`, `landing.css`, `login.css` |
| `.label` | `login.css`, `registrar_observacoes.css` |
| `.counter` | `cancela_procedimento.css`, `registrar_observacoes.css` |
| `.textarea-box` | `cancela_procedimento.css`, `registrar_observacoes.css` |
| `.subtitle` | `alertas.css`, `graficos.css` |

### Por que é um problema
Quando você precisar alterar o visual de um `.clock`, por exemplo, vai precisar alterar em 3 arquivos separados. E como cada redefinição tem valores ligeiramente diferentes (o `.clock` em `salas.css` tem `width: 90px`, em `alertas.css` tem `width: 70px`, em `detalhes_cirurgia.css` tem `width: 48px`), fica impossível saber qual valor é "o correto" sem abrir todos os arquivos.

O `.avatar` também é redefinido com dimensões distintas (80×80 em `alertas.css`, 110×110 em `detalhes_cirurgia.css`) — o que indica que deveriam ser variantes de um mesmo componente, não classes repetidas.

### Como corrigir
Migrar os estilos compartilhados para `components.css`, que já existe e já é carregado por todas as páginas. Criar variantes via modificador quando necessário:

```css
/* components.css */
.avatar { width: 80px; height: 80px; ... }
.avatar--large { width: 110px; height: 110px; }
.avatar--mini { width: 60px; height: 60px; }

.clock { width: 70px; height: 70px; ... }
.clock--large { width: 90px; height: 90px; }
.clock--small { width: 48px; height: 48px; }
```

---

## 2. Design System — Ausência de variáveis CSS

### O problema
O projeto usa pelo menos **11 valores hexadecimais diferentes** para a cor verde, espalhados por todos os arquivos:

`#0d4f0d`, `#145b14`, `#165f12`, `#175f14`, `#1b5f16`, `#1d5f1d`, `#215f21`, `#2b6a28`, `#2d662d`, `#2f772f`, `#335f2d`, `#336633`, `#3b7735`, `#40c4ff` (azul do logo)

Nenhum arquivo usa variáveis CSS (`--var`). Toda tipografia, espaçamento e cor está hardcoded inline.

### Por que é um problema
Para ajustar a paleta de cor (por exemplo, deixar o verde mais escuro para melhor contraste na TV), você precisaria fazer busca e substituição em 10 arquivos CSS e ainda correria o risco de deixar algum fora. É impossível garantir consistência visual sem variáveis.

### Como corrigir
Adicionar no início de `global.css` (já carregado por todos):

```css
:root {
  /* Cores */
  --color-primary: #175f14;
  --color-primary-light: #2b6a28;
  --color-primary-dark: #0d4f0d;
  --color-primary-muted: #c7d9c1;
  --color-text: #111;
  --color-text-muted: #335f2d;
  --color-border: #215f21;
  --color-bg-panel: #f4f4f4;
  --color-white: #ffffff;

  /* Tipografia */
  --font-base: Arial, Helvetica, sans-serif;
  --text-xs: 14px;
  --text-sm: 18px;
  --text-md: 22px;
  --text-lg: 26px;
  --text-xl: 32px;
  --text-2xl: 42px;

  /* Espaçamento */
  --radius-sm: 12px;
  --radius-md: 20px;
  --radius-lg: 35px;
  --gap-sm: 8px;
  --gap-md: 18px;
  --gap-lg: 30px;
}
```

Depois substituir todos os valores hardcoded pelos tokens correspondentes. Isso permite ajustar toda a identidade visual alterando apenas este bloco.

---

## 3. Responsividade — Layout fixado em mobile sem adaptação para desktop/TV

### O problema
O projeto inteiro foi construído para uma tela de celular (~390px de largura), mas a apresentação será feita em TV. Os principais sintomas encontrados:

**`.panel` fixado em 65% de largura** (`components.css`): Em uma TV 4K ou mesmo 1920px, o painel fica estreito no centro com muito espaço vazio nas laterais.

**`.bottom-nav` fixado em 65% de largura** e posicionado com `bottom: 10px`: A barra de navegação foi feita para ficar sobre o conteúdo num celular. Em desktop ela fica flutuando no meio da tela.

**Tamanhos de fonte e elementos em `px` absolutos**: Fontes de 22px, 28px, 34px, etc. foram calibradas para uma tela de ~5 polegadas. Numa TV de 55 polegadas vista a 2-3 metros de distância, esses valores ficam pequenos demais.

**`.bottom-nav` está dentro de `.screen` em `salas.html`** mas fora em todos os outros templates: inconsistência estrutural que vai causar comportamentos diferentes dependendo da página.

**`landing.css` usa `padding-top: 260px`** no `.content`: valor absoluto que quebra em telas com altura diferente.

**`login.css` tem `.content` com `width: 65%`**: duplica a lógica de largura que já existe no `.panel` de `components.css`, mas com contexto diferente.

### Como corrigir
Adicionar media queries para desktop e TV em `components.css`. A abordagem correta é usar `clamp()` para escalabilidade progressiva, e `@media` para ajustes maiores:

```css
/* components.css */

/* Painel — mobile-first, expande em desktop */
.panel {
  width: 95%;           /* mobile */
  padding: 20px 16px 120px;
}

@media (min-width: 768px) {
  .panel { width: 75%; padding: 28px 32px 120px; }
}

@media (min-width: 1280px) {
  .panel { width: 60%; padding: 36px 48px 100px; }
}

@media (min-width: 1920px) {
  /* TV */
  .panel { width: 55%; padding: 48px 64px 100px; }
  /* Tipografia escala com a tela */
  html { font-size: 20px; }
}

/* Bottom-nav — centralizada em todas as telas */
.bottom-nav {
  width: 60%;
  max-width: 700px;   /* evita que fique larga demais em TV */
}
```

Para fontes, migrar para `clamp()`:
```css
/* Escala suavemente entre mobile e TV */
.room-info h2 { font-size: clamp(20px, 2vw, 36px); }
.alert-description { font-size: clamp(16px, 1.5vw, 28px); }
```

---

## 4. Estrutura HTML — Inconsistências entre páginas

### O problema

**Ordem dos `<link>` CSS é inconsistente entre templates:**

- `alertas.html`: `components.css` → `alertas.css` → `global.css`
- `cancela_procedimento.html`: `cancela_procedimento.css` → `components.css` → `global.css`
- `detalhes_cirurgia.html`: `detalhes_cirurgia.css` → `components.css` → `global.css`

`global.css` deveria sempre vir **primeiro** (reset + variáveis), depois `components.css`, depois o CSS específico da página. A ordem atual inverte a cascata e pode causar comportamentos imprevisíveis quando nomes de classe colidem.

**Ordem correta para todos os templates:**
```html
<link rel="stylesheet" href="../styles/global.css">
<link rel="stylesheet" href="../styles/components.css">
<link rel="stylesheet" href="../styles/[pagina].css">
```

**`<title>` inconsistente:**
- `cancela_procedimento.html`: `"Cancelar Procedimento"` (sem "Antecessum OR")
- `graficos.html`: `"Dashboard Centro Cirúrgico"` (sem "Antecessum OR")
- `registrar_observacoes.html`: `"Registrar Observações"` (sem "Antecessum OR")

Padrão correto a adotar: `"Antecessum OR — [Nome da Página]"`

**`.bottom-nav` dentro de `.screen` em `salas.html`** mas fora em todas as outras páginas: isso faz com que o posicionamento do `fixed` se comporte diferente (um `fixed` dentro de um `transform` ou overflow pode ter comportamento inesperado).

**`cancela_procedimento.html` tem `.top-bar`** (barra verde de topo) mas `registrar_observacoes.html` também tem — e são estilos diferentes, um em cada CSS. Deveria ser um único componente reutilizável em `components.css`.

**Ícone de volta inconsistente:**
- `alertas.html` e `detalhes_cirurgia.html` usam `‹` (lsaquo)
- `cancela_procedimento.html`, `graficos.html` e `registrar_observacoes.html` usam `❮` (emoji)

Defina um padrão único para todos.

---

## 5. JavaScript — Problemas de estrutura e robustez

### O problema

**Dois `DOMContentLoaded` separados em `scripts.js`**: O arquivo tem dois `document.addEventListener('DOMContentLoaded', ...)` independentes. Não é tecnicamente errado, mas é má prática — eles deveriam estar unificados em um único listener.

**`scripts.js` só é carregado em 2 das 8 páginas** (`login.html` e `detalhes_cirurgia.html`, `cancela_procedimento.html`): A lógica de radio buttons existe em `cancela_procedimento.html` e funciona porque o script é carregado. Mas se amanhã outra página precisar de interatividade, vai faltar o `<script>` por esquecimento.

**`togglePassword()` é função global**: Está declarada no escopo global do script, o que funciona mas é má prática em qualquer projeto que vá crescer. Deveria ser encapsulada.

**Nenhuma validação de formulário**: O botão "Confirmar Cancelamento" e o botão "Confirmar" de observações não validam se um motivo foi selecionado ou se o campo de texto foi preenchido antes de submeter.

**Contador de caracteres não funciona**: O HTML de `cancela_procedimento.html` e `registrar_observacoes.html` mostra `0/200` e `0/300` como texto estático. Não há nenhum listener no `<textarea>` atualizando esse valor.

### Como corrigir

```js
// scripts.js — versão corrigida

document.addEventListener('DOMContentLoaded', () => {

  // Radio buttons
  document.querySelectorAll('.radio-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.radio-circle').forEach(c => c.classList.remove('selected'));
      item.querySelector('.radio-circle').classList.add('selected');
    });
  });

  // Timeline circles
  document.querySelectorAll('.timeline-circle').forEach(circle => {
    circle.addEventListener('click', () => {
      circle.classList.toggle('done');
      circle.innerHTML = circle.classList.contains('done') ? '✓' : '';
    });
  });

  // Contadores de textarea
  document.querySelectorAll('.textarea-box textarea').forEach(textarea => {
    const counter = textarea.closest('.textarea-box')?.querySelector('.counter');
    if (!counter) return;
    const max = parseInt(counter.textContent.split('/')[1]) || 200;
    textarea.addEventListener('input', () => {
      counter.textContent = `${textarea.value.length}/${max}`;
    });
  });

});

// Toggle de senha — encapsulado
function togglePassword() {
  const pw = document.getElementById('password');
  if (pw) pw.type = pw.type === 'password' ? 'text' : 'password';
}
```

E incluir o script em **todas** as páginas, não apenas em algumas:
```html
<!-- No final do <body> de todos os templates -->
<script src="../scripts/scripts.js"></script>
```

---

## Sumário de Prioridades

| # | Problema | Impacto | Esforço |
|---|---|---|---|
| 1 | Adicionar variáveis CSS em `global.css` | Alto — desbloqueia todos os outros ajustes | Baixo |
| 2 | Corrigir ordem dos `<link>` CSS em todos os templates | Alto — evita bugs de cascata | Baixo |
| 3 | Mover estilos duplicados para `components.css` | Alto — facilita manutenção | Médio |
| 4 | Adicionar media queries para desktop/TV | Alto — problema central da apresentação | Médio |
| 5 | Unificar `scripts.js` e corrigir contadores | Médio — afeta UX | Baixo |
| 6 | Padronizar `<title>`, ícone de voltar e posição do `bottom-nav` | Baixo — polimento | Baixo |

---

## Ordem de Execução Recomendada

1. **`global.css`**: adicionar variáveis CSS (`--color-*`, `--text-*`, `--radius-*`)
2. **Todos os HTMLs**: corrigir ordem dos `<link>` e padronizar `<title>`
3. **`components.css`**: consolidar componentes duplicados (`.avatar`, `.clock`, `.check-circle`, `.section-title`, etc.) usando modificadores BEM
4. **`components.css`**: adicionar media queries para `.panel`, `.bottom-nav` e tipografia
5. **CSS de cada página**: substituir valores hardcoded pelas variáveis criadas no passo 1
6. **`scripts.js`**: unificar listeners, corrigir contador de textarea, adicionar `<script>` em todas as páginas
