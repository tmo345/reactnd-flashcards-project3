import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';

const CardList = ({ cardsInDeck, onScrollEnd, renderListItem }) => (
  <FlatList
    data={cardsInDeck}
    keyExtractor={item => item.id}
    renderItem={renderListItem}
    horizontal={true}
    pagingEnabled={true}
    onMomentumScrollEnd={onScrollEnd}
  />
);

export default CardList;

CardList.propTypes = {
  cardsInDeck: PropTypes.array.isRequired,
  onScrollEnd: PropTypes.func.isRequired,
  renderListItem: PropTypes.func.isRequired,
};
