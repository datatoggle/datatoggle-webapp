import {DestinationConfig, DestinationDef, ParamType} from '../../../service/restapi/data'


export function isDestinationEnablable(config: DestinationConfig, def: DestinationDef): boolean {

  for (const paramDef of def.paramDefs) {
    if (paramDef.isMandatory){
      if (config.destinationSpecificConfig.hasOwnProperty(paramDef.uri)){
        let paramValue = config.destinationSpecificConfig[paramDef.uri]
        switch (paramDef.type) {
          case ParamType.String:
            if (!paramValue) return false;
            break
          case ParamType.Dict:
            if (Object.getOwnPropertyNames(paramValue).length === 0) return false
            break
        }
      } else {
        return false
      }
    }
  }

  return true;

}
