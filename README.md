# Antecessum OR

Protótipo de interface para gestão de cirurgias em tempo real em centros cirúrgicos.

---

## Sobre o projeto

O Antecessum OR é uma prova de conceito (MVP) desenvolvida para auxiliar equipes de centros cirúrgicos no acompanhamento em tempo real do status das salas, alertas de intercorrências e registro de informações durante procedimentos.

O projeto foi desenvolvido como protótipo estático em HTML, CSS e JavaScript puro, sem dependências externas.

---

## Telas

| Página | Descrição |
|---|---|
| `landing.html` | Tela inicial de apresentação do sistema |
| `login.html` | Autenticação por usuário/senha ou biometria |
| `salas.html` | Painel com status de todas as salas cirúrgicas |
| `detalhes_cirurgia.html` | Detalhes do procedimento, equipe e linha do tempo |
| `alertas.html` | Alertas em tempo real (atrasos, materiais, equipe) |
| `graficos.html` | Dashboard com métricas e indicadores do dia |
| `registrar_observacoes.html` | Registro de observações durante o procedimento |
| `cancela_procedimento.html` | Cancelamento de procedimento com seleção de motivo |

---

## Estrutura

```
Antecessum-OR/
├── templates/
├── styles/
│   ├── global.css
│   ├── components.css
│   ├── alertas.css
│   ├── cancela_procedimento.css
│   ├── detalhes_cirurgia.css
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

## Como visualizar

Por ser um projeto estático, basta abrir qualquer arquivo da pasta `templates/` diretamente no navegador. O ponto de entrada recomendado é `landing.html`.

Alternativamente, com o VS Code instalado, a extensão **Live Server** permite visualizar com recarregamento automático.

---

## Tecnologias Usadas

- HTML5
- CSS3 (variáveis, flexbox, pseudo-elementos)
- JavaScript (vanilla)
