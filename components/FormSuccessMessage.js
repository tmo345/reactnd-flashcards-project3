import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const FormSuccessMessage = props => {
  const { submittedItem, dismissFormSuccessMessage } = props;
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
      onPress={dismissFormSuccessMessage}
    >
      <Ionicons
        name="ios-close"
        size={30}
        color="green"
        style={{ padding: 10 }}
      />
      <Text style={{ color: 'green', marginLeft: 7.5 }}>
        {submittedItem} successfully added
      </Text>
    </TouchableOpacity>
  );
};

FormSuccessMessage.propTypes = {
  dismissFormSuccessMessage: PropTypes.func.isRequired,
  submittedItem: PropTypes.string.isRequired,
};

export default FormSuccessMessage;
