import type { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { UIProvider } from "react-native-web-ui-components";
import captureMomentForm from "../capture-moment-form.json";
import Form from "react-native-web-jsonschema-form";
import { Text, View } from "../components/Themed";
import { useEffect } from "react";

export default function TabOneScreen({
  navigation,
}: {
  navigation: StackNavigationProp<{}>;
}) {
  const [formData, setFormData] = useState(captureMomentForm.form.form_data);

  // Sample onChange
  const onChangeSample = (event) =>
    setFormData({
      ...formData,
      [event.params.name]: event.params.value,
    });

  // intentionally does not change any state
  const onChangeLogging = (event) => {
    console.log({
      ...event.params.values,
      [event.params.name]: event.params.value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const theme = {
    input: {
      focused: StyleSheet.create({
        border: {
          borderColor: "yellow",
        },
      }),
    },
  };
  const ThemeWrapper = ({ children }: { children: JSX.Element }) => {
    // this part differs from the example in that it uses React Navigation
    return (
      <UIProvider theme={theme} history={navigation}>
        {children}
      </UIProvider>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <ThemeWrapper>
        <Form
          formData={formData}
          schema={captureMomentForm.form.json_schema}
          uiSchema={captureMomentForm.form.ui_schema}
          onChange={onChangeLogging}
        />
      </ThemeWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
