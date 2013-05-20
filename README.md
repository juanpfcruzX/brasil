Brasil
======

Biblioteca de ferramentas utilitárias voltadas para programadores brasileiros.

Escrito por [@renatoargh](http://www.github.com/renatoargh "Renato Gama")

### Instalação

    npm install brasil
    
### Utilização

    var br = require("brasil");
    
**br.registroNacional(valor)** - Valida se `valor` é um CPF, CNPJ ou nenhum dos dois. 

- String "cpf" se a string for validada como cpf
- String "cnpj" se a string for validada como cnpj
- Bolean false se a string não for nenhum dos dois
    
**br.cnpj(valor)** - Valida se `valor` é um CNPJ ou não. 

- Bolean true se `valor` for um cnpj
- Bolean false caso contrário

**br.cpf(valor)** - Valida se `valor` é um CPF ou não. 

- Bolean true se `valor` for um cpf
- Bolean false caso contrário

**br.inscricaoEstadual([estado], valor)** - Valida se `valor` é uma inscrição estadual do estado `estado`

- Esta função é um atalho para a biblioteca [ie](https://github.com/gammasoft/ie "Biblioteca de validação de inscrições estaduais para node.js")
 
-----------------------------------------

#### Faça uma doação :)
[![Faça uma doação!](https://www.paypalobjects.com/pt_BR/BR/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/br/cgi-bin/webscr?cmd=_flow&SESSION=qNGRiSLjATOZ2vcKDXVkTmXi5nz5yqBQNI2wQ-qmHQ4wtKUIIg9Px9HR3QG&dispatch=5885d80a13c0db1f8e263663d3faee8d14f86393d55a810282b64afed84968ec)

#### Licença BSD

Copyright (c) 2013, Renato Mendonça da Gama  
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

- Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer. 
- Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
