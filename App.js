// Configuração das rotas e da navegação do aplicativo.

// Imports de navegação.
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Imports das telas e do navegador de abas do app logado.
import Inicial from "./src/screens/Inicial";
import Login from "./src/screens/Login";
import Cadastro from "./src/screens/Cadastro";
import Dispositivo from "./src/screens/Dispositivo";
import Apresentacao2 from "./src/screens/Apresentacao2";
import Apresentacao3 from "./src/screens/Apresentacao3";
import Apresentacao4 from "./src/screens/Apresentacao4";
import EsqueciSenha from "./src/screens/EsqueciSenha";
import MainTabs from "./src/navigation/MainTabs";
import MeusDispositivos from "./src/screens/MeusDispositivos";
import Notificacoes from "./src/screens/Notificacoes";
import PrivacidadeDados from "./src/screens/PrivacidadeDados";
import AjudaSuporte from "./src/screens/AjudaSuporte";
import EditarPerfil from "./src/screens/EditarPerfil";

// Navegador baseado em pilha.
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* As telas possuem cabeçalhos próprios. */}
      <Stack.Navigator initialRouteName="Inicial" screenOptions={{ headerShown: false }}>
        {/* Rotas de autenticação */}
        <Stack.Screen name="Inicial" component={Inicial} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} />

        {/* Rotas da apresentação */}
        <Stack.Screen name="Dispositivo" component={Dispositivo} />
        <Stack.Screen name="Apresentacao2" component={Apresentacao2} />
        <Stack.Screen name="Apresentacao3" component={Apresentacao3} />
        <Stack.Screen name="Apresentacao4" component={Apresentacao4} />

        {/* App logado (abas inferiores: Home, Painel, Alertas, Perfil) */}
        <Stack.Screen name="MainTabs" component={MainTabs} />

        {/* Telas de detalhe abertas a partir do Perfil */}
        <Stack.Screen name="MeusDispositivos" component={MeusDispositivos} />
        <Stack.Screen name="Notificacoes" component={Notificacoes} />
        <Stack.Screen name="PrivacidadeDados" component={PrivacidadeDados} />
        <Stack.Screen name="AjudaSuporte" component={AjudaSuporte} />
        <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}