# Antecessum OR

Protótipo de interface para gestão de cirurgias em tempo real em centros cirúrgicos, pensado para apresentação em TV.

---

## Sobre o projeto

O Antecessum OR é uma prova de conceito (MVP) desenvolvida para auxiliar equipes de centros cirúrgicos no acompanhamento em tempo real do status das salas, alertas de intercorrências e registro de informações durante procedimentos.

O projeto foi desenvolvido como protótipo estático em HTML, CSS e JavaScript puro, sem dependências externas, com um sistema de design consolidado (paleta de cores em variáveis, componentes reutilizáveis) e responsividade real entre celular, desktop e TV.

---

## Telas

| Página | Descrição |
|---|---|
| `landing.html` | Tela inicial de apresentação do sistema |
| `login.html` | Autenticação por usuário/senha ou biometria |
| `salas.html` | Painel com status de todas as salas cirúrgicas — cada card é um link |
| `detalhes_sala1.html` | Sala 1 — Em andamento |
| `detalhes_sala2.html` | Sala 2 — Cancelada |
| `detalhes_sala3.html` | Sala 3 — Em preparação |
| `detalhes_sala4.html` | Sala 4 — Em andamento |
| `detalhes_sala5.html` | Sala 5 — Atrasada |
| `alertas.html` | Alertas em tempo real (atrasos, materiais, equipe) |
| `graficos.html` | Dashboard com métricas e indicadores do dia |
| `registrar_observacoes.html` | Registro de observações durante o procedimento |
| `cancela_procedimento.html` | Cancelamento de procedimento com seleção de motivo |

Cada sala em `salas.html` tem sua própria página de detalhes, com paciente, equipe e linha do tempo específicos — não uma página genérica reaproveitada. O botão "Cancelar" e o link "Registrar Observação" dentro de cada página de detalhes carregam a sala de origem pela URL (`?from=salaN`), e o `scripts.js` usa isso para que o link "voltar" sempre retorne para a sala correta, não para uma fixa.

---

## Estrutura

```
Antecessum-OR/
├── templates/
│   ├── landing.html
│   ├── login.html
│   ├── salas.html
│   ├── detalhes_sala1.html
│   ├── detalhes_sala2.html
│   ├── detalhes_sala3.html
│   ├── detalhes_sala4.html
│   ├── detalhes_sala5.html
│   ├── alertas.html
│   ├── graficos.html
│   ├── registrar_observacoes.html
│   └── cancela_procedimento.html
├── styles/
│   ├── global.css        # reset, variáveis de design e tipografia fluida
│   ├── components.css    # componentes reutilizados em várias páginas
│   ├── detalhes.css      # compartilhado pelas 5 páginas de detalhes de sala
│   ├── alertas.css
│   ├── cancela_procedimento.css
│   ├── graficos.css
│   ├── landing.css
│   ├── login.css
│   ├── registrar_observacoes.css
│   └── salas.css
├── scripts/
│   └── scripts.js
└── uploads/
    └── background.avif
```

---

## Sistema de design

- **Paleta de cores** centralizada em variáveis CSS (`:root` em `global.css`) — nenhum hexadecimal solto no resto do projeto.
- **Tipografia fluida**: `font-size` do `<html>` escala suavemente do celular até a TV via `clamp()`, então a maioria dos componentes (definidos em `rem`) cresce proporcionalmente sem precisar de uma regra por breakpoint.
- **Breakpoints estruturais** (não de tamanho) em `components.css` para onde o layout realmente muda: largura do painel, empilhamento de cards, navbar.
- **Componentes reutilizáveis**: avatar, relógio, ícone genérico, badge, caixa de aviso, botão de confirmação — todos com variações por tamanho/contexto via classes modificadoras (`--sm`, `--md`, `--lg`).

---

## Como visualizar

Por ser um projeto estático, basta abrir qualquer arquivo da pasta `templates/` diretamente no navegador. O ponto de entrada recomendado é `landing.html`.

Alternativamente, com o VS Code instalado, a extensão **Live Server** permite visualizar com recarregamento automático.

---

## Tecnologias

- HTML5
- CSS3 (variáveis, flexbox, `clamp()`, pseudo-elementos)
- JavaScript (vanilla)
