import Sequelize from 'sequelize';

import User from '../app/models/User';
import Session from '../app/models/Session';
import LogAccess from '../app/models/LogAccess';
import Banner from '../app/models/Banner';
import Topic from '../app/models/Topic';
import TopicItem from '../app/models/TopicItem';
import Onesignal from '../app/models/Onesignal';
import PaymentGateway from '../app/models/PaymentGateway';
import Payment from '../app/models/Payment';
import IntegratorTicket from '../app/models/IntegratorTicket';
import CieloGateway from '../app/models/CieloGateway';
import PaymentOperation from '../app/models/PaymentOperation';
import IntegratorCaixaBaixaPayments from '../app/models/IntegratorCaixaBaixaPayments';
import CronPushConfig from '../app/models/CronPushConfig';
import IntegratorPaymentMethods from '../app/models/IntegratorPaymentMethods';

import databaseConfig from '../config/database';

const models = [
  User,
  Session,
  LogAccess,
  Banner,
  Topic,
  TopicItem,
  Onesignal,
  PaymentGateway,
  Payment,
  IntegratorTicket,
  CieloGateway,
  PaymentOperation,
  IntegratorCaixaBaixaPayments,
  CronPushConfig,
  IntegratorPaymentMethods,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
