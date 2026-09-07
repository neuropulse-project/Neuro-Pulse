// Navegador de abas inferior do app logado. Cada aba tem seu próprio ícone
// (Ionicons), rótulo e, quando ativa, um pontinho laranja embaixo — igual
// ao design de referência.

// Imports de navegação, ícones, cores e das 4 telas de cada aba.
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import Home from "../screens/Home";
import Painel from "../screens/Painel";
import Alertas from "../screens/Alertas";
import Perfil from "../screens/Perfil";

const Tab = createBottomTabNavigator();

// Ícone de cada aba: outline quando inativa, preenchido quando ativa.
const ICONS = {
  Home: { active: "home", inactive: "home-outline" },
  Painel: { active: "stats-chart", inactive: "stats-chart-outline" },
  Alertas: { active: "notifications", inactive: "notifications-outline" },
  Perfil: { active: "person", inactive: "person-outline" },
};

// Componente usado como tabBarIcon: ícone + rótulo + pontinho quando ativa.
function TabIcon({ routeName, focused }) {
  const iconName = focused ? ICONS[routeName].active : ICONS[routeName].inactive;
  const color = focused ? colors.navy : colors.muted;

  return (
    <View style={tabStyles.wrap}>
      <Ionicons name={iconName} size={22} color={color} />
      <Text style={[tabStyles.label, { color }]}>{routeName}</Text>
      {focused && <View style={tabStyles.dot} />}
    </View>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: tabStyles.bar,
        tabBarIcon: ({ focused }) => <TabIcon routeName={route.name} focused={focused} />,
      })}
    >
      {/* As 4 abas do app logado. */}
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Painel" component={Painel} />
      <Tab.Screen name="Alertas" component={Alertas} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

// Estilos da barra de abas e do ícone/rótulo/pontinho de cada aba.
const tabStyles = StyleSheet.create({
  bar: {
    height: 76,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
  wrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 64,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 3,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.orange,
    marginTop: 4,
  },
});
