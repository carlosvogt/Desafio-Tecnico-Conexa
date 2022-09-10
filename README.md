# Desafio Técnico Front-End Mobile Conexa

## Sobre o projeto:

Desenvolvido por Carlos Rodrigo Vogt

- Layout:
    - Utilizei a ideia de layout do desafio técnico Web, porém, fiz ajustes para uma melhor experiência de uso.
    - Cores e ícones retirados do site da Conexa.
    - O projeto conta com um arquivo de temas, mantendo todas as cores do projeto centralizadas em um único arquivo.
    - Adicionado ícone que foi retirado do site.
- Internacionalização
    - O aplicativo foi desenvolvido utilizando a biblioteca i18n, que serve para tradução, assim, o texto é escrito sempre nos arquivos de tradução, e caso o aplicativo seja lançado em outro país, basta copiar os arquivos de tradução e reescreve-los na nova linguagem.
- Formulários:
    - Todos os formulários possuem validação com Yup, o que evita erros de digitação e informa o usuário caso qualquer campo tenha sido preenchido de forma errada. Todos os formulários possuem também um botão de limpar o conteúdo já digitado, esse botão fica visível apenas caso o input contenha algum texto. O input de senha possui a opção de visualizar ou ocultar a senha.
- Tratamento de erros:
    - Todos os chamados a API possuem tratamento de erros para evitar que o aplicativo quebre e também, caso ocorra algum erro é exibido uma mensagem toast para informar o usuário sobre o ocorrido.
- Testes:
    - Todas as telas possuem testes unitários de snapshot desenvolvidos com Jest, isso evita que futuras alterações nas telas possam vir a causar problemas.
- Armazenamento de dados:
    - São utilizados redux e asyncstorage para salvar os dados de acesso do usuário. Quando o usuário é logado, os dados são salvos no redux e no asyncstorage, caso ele saia do aplicativo e retorne mais tare, o asyncstorege se encarrega de passar os dados novamente ao redux para que ele possa ir do fluxo de navegação público para o privado, pois isso só é possível se o usuário possuir um token de acesso no redux. Ao Sair da conta, esses dados são apagados.
- Navegação:
    - A navegação é dividida em público e privado, o fluxo público é utilizado enquanto o usuário não possui um token (antes dele se logar), quando um token é salvo, o usuário é direcionado ao fluxo privado, tendo como primeira tela a Home.
- Componentes: Componentes usados mais de uma vez, ou que podem ser utilizados em outros locais foram componentizados, o que garante um código claro e evita repetições de código.
- Padronização de dados:
    - Os dados da API retornam no formato que não é o brasileiro, assim, foi ajustado para que os campos de data utilizem o padrão brasileiro.
- Linguagem e estilização
    - O projeto foi desenvolvido usando a linguagem javascript, o framework react-native e o estilo foi feito com StyleSheet que é próprio do framework. Optei por essas opções pois trata-se de um projeto pequeno, em projetos maiores optaria por utilizar typescript e styled components.
- Código limpo e de fácil manutenção:
    - Sempre desenvolvo com o objetivo do código ficar o mais claro possível, além de não deixar sujeiras que venham a interferir em uma análise ou manutenção futura.

## Telas
- Tela de login:
    - A tela de login possui um formulário com os campos e-mail e senha.
    - Campo e-mail:  Campo obrigatório, valida se o formato de texto informado é consistente a um e-mail.
    - Campo senha: Campo obrigatório.
    - Botão de login: Ao ser pressionado, o botão de login valida as informações do formulário e se estiverem válidas ele chama a API que retorna o token do usuário.
- Tela Home:
    - Ao ser acessada é carregada a lista de atendimentos agendados.
    - Possui as opções de sair da conta, ajuda, agendar consulta e de Atender uma consulta agendada, também possui a informação do número de consultas que estão agendadas.
- Tela de ajuda:
    - Ao pressionar o botão de ajuda, é aberto um modal com informações sobre o sistema.
- Tela de Sair:
    - Ao pressionar o botão de Sair, é aberto um modal para confirmação da ação, caso o usuário confirme, ele será deslogado e seus dados de acesso apagados do dispositivo.
- Tela de Atendimento:
    - Exibe os detalhes do atendimento, caso ocorra algum erro e os dados não forem carregados, é exibida uma mensagem em tela que substitui o conteúdo padrão.
- Tela de Agendar consulta:
    - A tela possui um formulário com os campos:
        - Nome: Obrigatório.
        - Data: Obrigatório, também verifica se a data informada é válida.
        - Hora: Obrigatório, também verifica se a hora informada é válida.
        - Observação: Opcional.
      -Se o formulário for válido os dados são enviados para a API.

## Instalação e testes
- Instalação
    - Para realizar a instalação do projeto, basta clonar o repositório, rodar o comando yarn e após o fim do download, rodar o comando yarn android.
- Testes
    - O projeto conta com testes unitários de tela, para rodar eles, basta usar o comando yarn test.
