import {isDestinationEnablable} from './destinationCheck'
import {
  DestinationConfig,
  DestinationDef,
  DestinationParamDef,
  DestinationSpecificConfig,
  ParamType
} from '../../../service/restapi/data'

function buildConfig(specificConf: DestinationSpecificConfig) {
  let config: DestinationConfig = {
    isEnabled: false,
    destinationUri: '',
    destinationSpecificConfig: specificConf,
  }
  return config
}

function buildDef(type: ParamType, uri: string) {
  let paramDef: DestinationParamDef = {
    defaultValue: "",
    isMandatory: true,
    name: 'paramDefName',
    type: type,
    uri: uri
  }

  let def: DestinationDef = {
    uri: '',
    name: '',
    paramDefs: [
      paramDef
    ],
  }
  return def
}

test('isDestinationEnablable missing mandatory param return false', () => {
  let config = buildConfig({'badParamUri': "bla"})
  let def = buildDef(ParamType.String, "paramUri")
  let result = isDestinationEnablable(config, def)
  expect(result).toBeFalsy()
});

test('isDestinationEnablable empty string mandatory param return false', () => {
  let config = buildConfig({'paramUri': ""})
  let def = buildDef(ParamType.String, "paramUri")
  let result = isDestinationEnablable(config, def)
  expect(result).toBeFalsy()
});

test('isDestinationEnablable empty dict mandatory param return false', () => {
  let config = buildConfig({'paramUri': {}})
  let def = buildDef(ParamType.Dict, "paramUri")
  let result = isDestinationEnablable(config, def)
  expect(result).toBeFalsy()
});

test('isDestinationEnablable valid string param return true', () => {
  let config = buildConfig({'paramUri': "value"})
  let def = buildDef(ParamType.String, "paramUri")
  let result = isDestinationEnablable(config, def)
  expect(result).toBeTruthy()
});

test('isDestinationEnablable valid dict param return true', () => {
  let config = buildConfig({'paramUri': {key: "value"}})
  let def = buildDef(ParamType.Dict, "paramUri")
  let result = isDestinationEnablable(config, def)
  expect(result).toBeTruthy()
});

test('isDestinationEnablable valid Int 0 param return true', () => {
  let config = buildConfig({'paramUri': 0})
  let def = buildDef(ParamType.Int, "paramUri")
  let result = isDestinationEnablable(config, def)
  expect(result).toBeTruthy()
});

test('isDestinationEnablable valid float 0 param return true', () => {
  let config = buildConfig({'paramUri': 0.0})
  let def = buildDef(ParamType.Float, "paramUri")
  let result = isDestinationEnablable(config, def)
  expect(result).toBeTruthy()
});

test('isDestinationEnablable valid boolean false param return true', () => {
  let config = buildConfig({'paramUri': false})
  let def = buildDef(ParamType.Boolean, "paramUri")
  let result = isDestinationEnablable(config, def)
  expect(result).toBeTruthy()
});
