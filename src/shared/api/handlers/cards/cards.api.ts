import { api } from '../../api';
import { Card } from './cards.types';

export class CardsApi {
  static getCards() {
    return api().get<Card[]>('cards');
  }
}
