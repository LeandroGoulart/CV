# CV_ONLINE — Portfólio de Leandro Goulart

Portfólio pessoal estático com foco em apresentação profissional, projetos e formulário de contato integrado (Formspree). Projeto pensado para ser leve, responsivo e fácil de manter.

![Screenshot do site](src/images/capa_do_site.png)

## Funcionalidades principais
- Hero com foto e descrição curta.
- Menu fixo com âncoras para seção (Sobre, Formação, Habilidades, Projetos, Contato).
- Seção de habilidades com badges Devicon.
- Carrossel responsivo de projetos.
- Formulário de contato integrado ao Formspree.
- Variáveis CSS para paleta de cores (fácil manutenção).

## Estrutura do projeto
- `index.html` — página principal.
- `src/style/main.css` — estilos gerais e variáveis de cores.
- `src/style/carousel.css` — estilos do carrossel (separado para manutenção).
- `src/style/badges.css` — estilos das badges (separado).
- `src/js/main.js` — lógica do carrossel e scripts.
- `src/images/` — imagens e logo.
- `readme.md` — este arquivo.

## Como executar 

Não é necessário baixar o projeto.

Basta acessar : https://leandrogoulart.github.io/CV/

## Formulário de contato (Formspree)
Interaja com o formulário, está 100% funcional e recebo diretamente no email de contato.

## Como editar cores e tema
Todas as cores estão em `:root` dentro de `src/style/main.css`. Para alterar a paleta, modifique as variáveis:
```css
:root {
  --cor-preto: #181818;
  --cor-verde: #00ff88;
  --cor-verde-hover: #00995e;
  --cor-branco: #fff;
  --cor-cinza-escuro: #232323;
  --cor-cinza-texto: #e0ffe7;
}
```

## Como editar badges e tecnologias
Badges usam Devicon via CDN. Para adicionar/remover, edite a seção `#habilidades` em `index.html`:
```html
<div class="badge">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" height="32"/>
  <span>HTML5</span>
</div>
```
Use a classe `.badge-learning` para destacar tecnologias em aprendizado.

## Carrossel de projetos
- Layout do carrossel: `src/style/carousel.css`
- Comportamento: `src/js/main.js` — verifique a função que calcula deslocamento baseado na largura do card.
- Se ocorrerem problemas (vários cards visíveis ao mesmo tempo), verifique se:
  - `.carousel-container` tem `overflow: hidden;`
  - `.carousel-track` está `display: flex;` e os `.projeto-card` têm `flex: 0 0 <largura>;`

## Boas práticas e dicas
- Use variáveis CSS para cores e tamanhos repetidos.
- Separe responsabilidades (CSS do carrossel / badges em arquivos próprios).
- Teste a navegação com header fixo; `section { scroll-margin-top: 110px; }` evita títulos encobertos.
- Acessibilidade: adicione `aria-label` em botões do carrossel e textos alternativos nas imagens.

## Contribuição
Pull requests são bem-vindos. Para correções rápidas:
1. Fork do repositório
2. Crie branch: `git checkout -b fix-minha-coisa`
3. Commit e push
4. Abra Pull Request

## Autor
Leandro Goulart — desenvolvedor Full Stack & Cybersecurity  
GitHub: https://github.com/LeandroGoulart

## Licença
Arquivo sem licença explícita. Recomenda-se adicionar uma (MIT, Apache-2.0 etc.) se for compartilhar publicamente.

---
Pequenas melhorias sugeridas para próximas versões:
- Adicionar feedback visual pós-envio do formulário (mensagem de sucesso/erro).
- Suporte a múltiplos idiomas.
- Otimizações de performance e SEO (meta tags, sitemap).