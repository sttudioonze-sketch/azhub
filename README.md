# AZHUB

Página de links da AZHUB, com serviços de análise no futebol.

## Executar localmente

Site estático em HTML, CSS e JavaScript, sem etapa de build.

```sh
python3 -m http.server 4187 --directory dist
```

Abra http://localhost:4187 no navegador.

## Arquivos

- `dist/index.html`: conteúdo, serviços e contatos.
- `dist/style.css`, `dist/glass-modern.css`, `dist/stadium-refinement.css`: layout, tema escuro e animações.
- `dist/dots.js`: fundo pontilhado com alternância verde, adaptado à densidade da tela e à preferência de movimento reduzido.
- `dist/assets/`: logos e imagens.

## Publicação

Em uma hospedagem estática, selecione `dist` como diretório público; não é necessário comando de build. A configuração e as permissões da hospedagem existente no Sites são administradas separadamente.

Os links de serviços abrem o WhatsApp da AZHUB. O card da Sttudio11WD direciona pedidos de orçamento de site ao contato da desenvolvedora. Nenhuma mensagem é enviada automaticamente.
