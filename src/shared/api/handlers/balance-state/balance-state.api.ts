import { api } from '../../api';
import { BalanceState } from './balance-state.types';

export class BalanceStateApi {
  static getBalanceState() {
    return api().get<BalanceState>('balance-state');
  }
}
