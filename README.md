# CZToken Token Deployment and Development
This custom smartcontract has developed using openzeppline framework. Here we will go through the steps that we need to deploy and run this smartcontract.
For development of this smart contract we have used truffle and nodejs framework as well.

#Before starting the development of smartcontract make sure you have installed Node.js(v8.11.1) and compatible npm(v5.6.0) in your system.


#Now we have to install the Ethereum client environment(testrpc for testing and development purpose) in the same serve.

# Steps to run testrpc in your system for testing and development purpose.

#Step1: Installation of testrpc ethereum client 
> $ npm install -g ethereumjs-testrpc

#Step2: Running testrpc eth client.

> $ testrpc

#For deploying and running CZToken contract run the following command:

#Install dependent node_modules of this contract:
> $ npm install
# Now run the following command to compile the smartcontract
> $ truffle compile
# Migrate and deploy the contracts to development blockchain:
>$ truffle migrate --network development
# Now use truffle console to check the smartcontract working and functionality.
> $ truffle console --network development 

