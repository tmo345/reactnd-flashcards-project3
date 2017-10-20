import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FormSuccessMessage = props => {
  const { submittedItem, dismissFormSuccessMessage } = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Ionicons
        name="ios-close"
        size={30}
        color="green"
        onPress={dismissFormSuccessMessage}
        style={{ padding: 10 }}
      />
      <Text style={{ color: 'green', marginLeft: 7.5 }}>
        {submittedItem} successfully added
      </Text>
    </View>
  );
};

export default FormSuccessMessage;
