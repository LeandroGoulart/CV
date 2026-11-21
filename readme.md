# Career OS — Leandro Goulart

Site único que reúne currículo, portfólio e identidade profissional.

Publicado em https://leandrogoulart.github.io/CV/

> Este repositório é, ele próprio, parte do portfólio: a forma como o projeto é
> estruturado, decidido e documentado é a evidência de organização que o site
> afirma ter. Por isso as decisões ficam registradas, não apenas o resultado.

## Arquitetura de informação

Quatro abas, nesta ordem, seguindo a leitura natural de um recrutador —
*quem é* → *o que sabe fazer* → *prove* → *quem é por dentro*:

| # | Aba | O que prova |
|---|---|---|
| 1 | **Identidade e trajetória** | De onde veio e como a transição faz sentido |
| 2 | **Competências técnicas** | O que sabe fazer, e em que nível de maturidade |
| 3 | **Portfólio** | A prova prática, com participação real declarada |
| 4 | **Comportamental** | Como pensa, decide e trabalha |

O perfil comportamental fica por último de propósito: DISC e tipologias têm
validade psicométrica contestada e funcionam melhor como aprofundamento de
quem já se interessou do que como cartão de visita.

## Estrutura de pastas

```
.
├── index.html            Documento único; cada aba é um <section role="tabpanel">
├── assets/
│   ├── img/              Imagens do site (webp)
│   └── icons/            Favicon em SVG
├── css/
│   ├── tokens.css        Design tokens — única fonte de valores
│   ├── base.css          Reset, tipografia e acessibilidade
│   ├── layout.css        Cabeçalho, abas, painéis, hero e rodapé
│   └── components.css    Espinha de peixe, cards de experiência e chips
└── js/
    ├── tabs.js           Navegação por abas (padrão ARIA + rota por hash)
    └── timeline.js       Filtro, alternância e rolagem da linha do tempo
```

### Convenções

- **Nenhum valor de cor, espaçamento ou tipografia fora de `tokens.css`.**
  Se precisou de um valor novo, ele vira token antes de ser usado.
- Classes em **BEM** simplificado: `.bloco__elemento`, `.bloco--variante`.
- JavaScript **defensivo**: se a marcação esperada não existir, o script sai
  em silêncio em vez de derrubar a página.
- Toda aba é endereçável por URL: `#identidade`, `#competencias`,
  `#portfolio`, `#comportamental`.

### Ordem da aba Identidade

`Hero` → `Sobre` → `Experiência` → `Linha do tempo`.

A linha do tempo vem **depois** das experiências de propósito: ela é contexto
de apoio, não a entrada. Quem chega quer o cargo atual e as entregas primeiro.

### Linha do tempo em espinha de peixe

Formato horizontal, com os marcos alternando acima e abaixo de uma espinha
central. A versão vertical anterior ocupava cerca de 1.800&nbsp;px de altura
para 19 marcos — um muro que o leitor abandona antes do fim. A espinha de peixe
resolve os mesmos 19 marcos em ~400&nbsp;px, com rolagem horizontal.

Os marcos ficam em ordem **crescente** — a trajetória se lê como percurso.
As experiências detalhadas ficam em ordem **decrescente**, como manda a
convenção de currículo. A diferença é intencional.

A alternância acima/abaixo é recalculada pelo JavaScript a cada filtro. Fazer
isso com `nth-child` em CSS quebraria: itens ocultos continuam contando para o
seletor, e um filtro poderia jogar todos os cartões para o mesmo lado.

As contagens dos filtros são calculadas a partir do próprio HTML em tempo de
execução. Não existe número escrito à mão que possa divergir do conteúdo.

### Acessibilidade

- Padrão ARIA Tabs completo, com navegação por setas, Home e End
- Link para pular a navegação
- Foco visível apenas para navegação por teclado (`:focus-visible`)
- `prefers-reduced-motion` respeitado
- Imagens com texto alternativo descritivo
- Filtros como `aria-pressed`, com o total de itens visíveis anunciado via `aria-label`
- Linha do tempo é uma `region` focável, navegável por teclado e por botões

## Identidade visual

A paleta vem da versão anterior do site e foi preservada, apenas formalizada:

| Token | Valor | Uso |
|---|---|---|
| `--c-bg` | `#181818` | Fundo |
| `--c-surface` | `#232323` | Cartões e cabeçalho |
| `--c-accent` | `#00ff88` | Marca, links, destaque |
| `--c-text-muted` | `#e0ffe7` | Texto corrido |

## Fases do projeto

| Fase | Entrega | Estado |
|---|---|---|
| 1 | Estrutura de pastas, tokens, navegação por abas e aba de Identidade | **Concluída** |
| 2 | Linha do tempo interativa e experiências na aba 1 | **Concluída** |
| 3 | Aba de Competências | A fazer |
| 4 | Aba de Portfólio, com carrossel e filtros | A fazer |
| 5 | Aba Comportamental | A fazer |
| 6 | Otimização de assets, Open Graph e troca dos PDFs | A fazer |
| 7 | Virada: Pages aponta para `career-os`, que vira `main` | A fazer |

## Branches

| Branch | Papel |
|---|---|
| `main` | Versão antiga, desatualizada. Será substituída na fase 7 |
| `carrossel` | O que o GitHub Pages publica hoje. Mantida até a virada |
| `career-os` | Desenvolvimento |

## Rodando localmente

Não há build. Qualquer servidor estático serve:

```bash
python -m http.server 8000
```

Depois abra `http://localhost:8000`.

Abrir o `index.html` direto pelo sistema de arquivos também funciona, mas
servir por HTTP evita diferenças de comportamento em caminhos relativos.
