import {Inject} from "di-ts";
import {config} from "../config";
import {DataImporter} from "./DataImporter";
import {StatusImporter} from "./StatusImporter";
import {SoapService} from "./SoapService";
import {logger} from "../logger";
const CronJob = require('cron').CronJob;

@Inject
export class CronService {

  constructor(protected dataImporter: DataImporter,
              protected statusImporter: StatusImporter,
              protected soapService: SoapService) {

  }

  scheduleEvseDataImport() {

    new CronJob(
      config.cronjob.evseData,
      () => {

        logger.info('Starts EVSE data import');

        this.soapService.eRoamingPullEvseData()
          .then(data => this.dataImporter.execute(data))
          .catch(err => logger.error(err))
        ;
      },
      () => null, // This function is executed when the job stops
      true // Start the job right now
    );

    logger.info('EVSE data import job scheduled');
  }

  scheduleEvseStatusImport() {

    new CronJob(
      config.cronjob.evseStatus,
      () => {

        logger.info('Starts EVSE status import');

        this.soapService.eRoamingPullEvseStatus()
          .then(data => this.statusImporter.execute(data))
          .catch(err => logger.error(err))
        ;
      },
      () => null, // This function is executed when the job stops
      true // Start the job right now
    );

    logger.info('EVSE status import job scheduled');
  }
}
