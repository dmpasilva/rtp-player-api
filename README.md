# API REST para o RTP Play

Este repositório contém um protótipo para um servidor de API REST para o RTP Play usado pela aplicação [RTP Player](https://github.com/dmpasilva/player-rtp).

**Esta aplicação não se encontra pronta para ser usada num ambiente de produção!**

## Funcionalidades:

Este servidor faz scrap da página Web do RTP Play para obter os dados necessários às funcionalidades fornecidas aos utilizadores.

As seguintes funcionalidades estão disponíveis:

- [x] Obter lista de categorias
- [x] Obter a lista de programas de TV
- [x] Obter programas de TV por categoria
- [x] Obter URL de reprodução do programa de TV
- [x] Obter partes do programa de TV
- [ ] Obter informação do programa de TV e episódios
- [ ] Obter a lista de programas de rádio
- [ ] Obter programas de rádio por categoria
- [ ] Obter URL de reprodução do programa de rádio
- [ ] Obter partes do programa de rádio
- [ ] Obter informação do programa de rádio e episódios
- [ ] Paginação
- [ ] Cache dos pedidos ao servidor da RTP
- [ ] Pesquisa por texto
- [ ] Emissões em direto


## Utilização

### Obter listas e categorias de programas

| Método | URL | Descrição |
|---|---|---|
| GET | `/programas/` | Obtém a primeira página de programas de TV On-Demand do RTP Play  |
| GET | `/programas/categorias` | Obtém todas as categorias de programas do RTP Play  |
| GET | `/programas/:category/` | Obtém a primeira página da lista de programas da categoria `:category`  |
| GET | `/programas/:category/:canal` | Obtém a primeira página da lista de programas da categoria `:category` do canal `:canal` |

### Obter programas, episódios e partes

| Método | URL | Descrição |
|---|---|---|
| GET | `/programa/:id` | Obtém a primeira página da lista de episódios do programa `:id`  |
| GET | `/programa/:id/:episode` | Obtém os objetos necessários à reprodução do programa passado nos parâmetros   |
| GET | `/programa/:id/:episode/:name` | O mesmo que o método anterior |
| GET | `/programa/:id/:episode/:name/:part` | Aplicável quando um programa tem várias partes (array `parts` da resposta anterior) |
| GET | `/programas/:category/:canal` | Obtém a primeira página da lista de programas da categoria `:category` do canal `:canal` |


## Aviso legal

Esta é uma aplicação não oficial desenvolvida por programadores independentes. 

Esta aplicação não é fornecida, suportada ou apoiada pela RTP ou qualquer empresa do grupo RTP.

Esta API poderá não produzir os resultados necessários para o funcionamento da(s) aplicação(ões) que dela dependa(m), uma vez que a qualquer momento a RTP poderá modificar o design do site ou criar mecanismos de bloqueio ao funcionamento desta aplicação.
