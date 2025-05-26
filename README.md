## Simulador de Investimentos 🏦

### 📋 Descrição
Um simulador web interativo que permite calcular retornos de diferentes tipos de investimentos em renda fixa do mercado brasileiro, incluindo Tesouro Direto, LCI, LCA e CDBs.

### 🛠️ Tecnologias Utilizadas
- HTML5
- CSS3 (com abordagem Mobile First)
- JavaScript (ES6+)
- Módulos ES6

### 🎯 Funcionalidades
- Simulação de investimentos com valores iniciais - e aportes mensais
- Cálculo de rentabilidade para diferentes tipos de ativos
- Cálculo automático de impostos (IR)
- Exibição detalhada dos resultados
- Interface responsiva
- Formatação automática de valores monetários

### 💰 Ativos Disponíveis
- Tesouro Prefixado (12.69% a.a.)
- Tesouro IPCA+ (7.58% a.a.)
- Tesouro Selic (14.25% a.a.)
- LCI e LCA (10.4% a.a.)
- CDB e LC (13.15% a.a.)

### 🧮 Abordagem Lógica
A aplicação foi estruturada em módulos para melhor organização e manutenibilidade:

`currencyUtils.js`
- Funções para formatação e manipulação de valores monetários
- Conversão entre strings formatadas e números

`simulation.js`
- Cálculos financeiros usando matemática financeira
- Implementação das fórmulas de juros compostos
- Cálculo de montante para investimento inicial e aportes

`constants.js`
- Definição das taxas de rentabilidade dos ativos
- Configuração das alíquotas de imposto de renda

`domHandlers.js`
- Manipulação do DOM
- Gerenciamento de eventos da interface

### 📊 Cálculos Principais
- Montante Final = Valor Inicial * (1 + taxa)^prazo
- Montante dos Aportes = Aporte * ((1 + taxa)^prazo - 1) / taxa
- Imposto de Renda: Alíquotas regressivas (22.5% a 15%)
- LCI e LCA são isentos de IR

### 🎨 Interface
- Design responsivo com Mobile First
- Feedback visual para interações do usuário
- Loading spinner durante cálculos
- Validação de campos obrigatórios
- Exibição clara dos resultados

### 🔄 Fluxo da Aplicação
- Usuário seleciona o tipo de ativo
- Insere valores iniciais e recorrentes
- Define prazo em meses ou anos
- Pode optar por taxa personalizada
- Sistema processa os dados
- Exibe resultados detalhados
- Permite nova simulação

### 📱 Responsividade
- Layout adaptativo para diferentes tamanhos de tela
- Reorganização de elementos em desktop
- Otimização para dispositivos móveis

### 🔍 Observações
- Taxas prefixadas podem ser sobrescritas pelo usuário
- Valores monetários são formatados automaticamente
- Cálculos consideram juros compostos
- Interface intuitiva e amigável