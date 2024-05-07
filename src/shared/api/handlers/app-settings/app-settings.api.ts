import { api } from '../../api';
import { AppSettings } from './app-settings.types';

export class AppSettingsApi {
  static getAppSettings() {
    return api().get<AppSettings>('app-settings');
  }
}
