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
│   ├── img/              Imagens do site (webp real, não renomeado)
│   └── icons/            Marca e favicon em SVG
├── css/
│   ├── tokens.css        Design tokens — única fonte de valores
│   ├── base.css          Reset, tipografia e acessibilidade
│   ├── layout.css        Cabeçalho, abas, painéis, hero e rodapé
│   └── components.css    Espinha de peixe, cards de experiência e chips
└── js/
    ├── tabs.js           Navegação por abas (padrão ARIA + rota por hash)
    ├── skills.js          Filtro de competências por nível de maturidade
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

### Competências: dimensão, não lista de tecnologias

Oito dimensões colapsáveis, fechadas por padrão. O estado inicial é uma tabela
de conteúdo de oito linhas, não um muro de cinquenta itens — cada cabeçalho traz
o nome, um descritivo de uma linha e a contagem, então a versão fechada já é
informativa.

Uma versão anterior usava um selo de 144&nbsp;px por competência. Ficou poluída:
densidade não é rigor. O nível virou um ponto de 9&nbsp;px com legenda no topo.

| Nível | Marcador | Significado |
|---|---|---|
| **Profissional** | ponto preenchido, ciano | Ambiente real, com responsabilidade sobre o resultado |
| **Prática** | ponto vazado, azul | Projeto ou laboratório executado |
| **Fundamentos** | ponto vazado menor, cinza | Conhecimento teórico, sem aplicação demonstrável |

O marcador distingue por **cor e preenchimento**, e Fundamentos também por
**tamanho** — cor sozinha não separaria dele de Prática, e violaria a WCAG 1.4.1.
Cada item ainda carrega o nível em texto para leitor de tela.

A evidência deixou de ser um expansor por competência e virou **uma linha por
dimensão**: onde foi exercida, com link quando há repositório. Oito linhas em vez
de cinquenta expansores.

### Filtro por stack

Um eixo só: Segurança, IAM, Cloud, Infraestrutura, Governança, Desenvolvimento.
Uma competência pertence a mais de uma stack — Active Directory é IAM e
Infraestrutura; Python é Desenvolvimento e Segurança.

Ao filtrar, as dimensões com itens relevantes **abrem sozinhas** e as vazias são
ocultadas. O recrutador não abre oito blocos para achar o que interessa.
Limpar o filtro devolve tudo ao estado fechado.

**Ressalva mantida:** o nível diz *onde* a competência foi exercida, não *quão
fundo*.

### Acessibilidade

- Padrão ARIA Tabs completo, com navegação por setas, Home e End
- Link para pular a navegação
- Foco visível apenas para navegação por teclado (`:focus-visible`)
- `prefers-reduced-motion` respeitado
- Imagens com texto alternativo descritivo
- Filtros como `aria-pressed`, com o total de itens visíveis anunciado via `aria-label`
- Linha do tempo é uma `region` focável, navegável por teclado e por botões

## Identidade visual

A paleta foi derivada da identidade pessoal já em uso no GitHub e no LinkedIn:
neon ciano e vermelho sobre azul-noite profundo. Os valores foram extraídos da
própria arte, não escolhidos por aproximação.

| Token | Valor | Uso |
|---|---|---|
| `--c-bg` | `#070e18` | Fundo |
| `--c-surface` | `#0f1a28` | Cartões e cabeçalho |
| `--c-accent` | `#35c8e8` | Neon primário: marca, links, estado ativo |
| `--c-alert` | `#ff4d5e` | Neon secundário: atenção |
| `--c-info` | `#8ab4ff` | Apoio: formação |
| `--c-text` | `#eaf4ff` | Texto |

### Marca

O símbolo é o da **Goulart InfoSolutions** — hexágono com monograma GI. O
arquivo original era raster; foi vetorizado a partir da arte fornecida e
normalizado para um `viewBox` de 869×1000.

`assets/icons/logo-gi.svg` usa `fill="currentColor"` e é aplicado no cabeçalho
como `mask-image` sobre `background-color: currentColor`. Assim o símbolo
herda o token de cor: se a paleta mudar, o logotipo acompanha sem reexportar
arquivo.

O azul original da marca é `#00a0ec`. No site ele é renderizado no ciano do
sistema (`--c-accent` `#35c8e8`) para não conviverem dois azuis próximos na
mesma tela — a diferença entre os dois seria lida como erro, não como
intenção. Para materiais impressos ou fora do site, vale usar o `#00a0ec`.

> Esta vetorização é uma reconstrução a partir de imagem. Se existir o arquivo
> vetorial original (SVG, AI ou PDF), ele deve substituir este — traçado
> derivado de raster nunca é idêntico ao original.

### Semântica da cor

A arte da identidade já carrega um significado que o site herda:

- **Ciano** — verificação, defesa, o que está validado
- **Vermelho** — atenção, ameaça, o que exige olhar

Vermelho é caro de propósito. Hoje aparece em três lugares: o marcador de
certificação na linha do tempo, a borda e o período do cargo atual, e o ponto
do favicon. **Se usar em tudo, deixa de significar algo.**

### Contraste

Todos os tokens de texto e de interface foram verificados contra `--c-surface`:

| Cor | Razão de contraste | WCAG |
|---|---|---|
| `--c-accent` `#35c8e8` | 8,8:1 | AAA |
| `--c-alert` `#ff4d5e` | 5,4:1 | AA |
| `--c-info` `#8ab4ff` | 8,4:1 | AAA |
| `--c-text-muted` `#b9d4e8` | 11,4:1 | AAA |
| `--c-text-dim` `#7d93a8` | 5,5:1 | AA |

### Fundo do hero

Três camadas, de trás para frente:

1. **Gradientes radiais** em ciano e vermelho, gerados em CSS
2. **Malha técnica** mascarada no topo, para não concorrer com os traçados
   de circuito da arte
3. **Arte da identidade** como faixa de horizonte no rodapé

A arte original é um banner de **3,8:1**. Usada em tela cheia com `cover`,
quase tudo seria cortado — o escudo e a skyline se perderiam. Como faixa
inferior com máscara de gradiente, a skyline e a silhueta funcionam como linha
de chão e o escudo fica atrás do conteúdo, que é a composição que a arte foi
desenhada para ter.

### Peso das imagens

| Arquivo | Uso | Peso |
|---|---|---|
| `bg.webp` | 1920&nbsp;px, desktop | 95&nbsp;KB |
| `bg-sm.webp` | 1280&nbsp;px, até 860&nbsp;px de viewport | 49&nbsp;KB |
| `perfil.webp` | Avatar | 99&nbsp;KB |

O original entregue era um **PNG de 1,46&nbsp;MB renomeado para `.webp`** — a
extensão mentia sobre o formato. Convertido para WebP real em qualidade 86, que
preserva as linhas finas de circuito sem artefato: **redução de 93%**.

Trocar a extensão não converte o arquivo. O navegador até renderiza, porque
detecta o formato pelo conteúdo, mas o peso continua o do PNG.

## Fases do projeto

| Fase | Entrega | Estado |
|---|---|---|
| 1 | Estrutura de pastas, tokens, navegação por abas e aba de Identidade | **Concluída** |
| 2 | Linha do tempo interativa e experiências na aba 1 | **Concluída** |
| 3 | Aba de Competências | **Concluída** |
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
