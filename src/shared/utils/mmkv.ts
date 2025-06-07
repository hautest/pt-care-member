import z from "zod";
import { MMKV, useMMKVString } from "react-native-mmkv";
import { useEffect, useLayoutEffect } from "react";

function isStringIncludeQuotesOrDoubleQuotes(value: string) {
  return (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  );
}

function removeQuotesOrDoubleQuotes(value: string) {
  return value.replace(/^"|"$/g, "").replace(/^'|'$/g, "");
}

export const mmkvStorage = new MMKV();

interface MMKVSchemaParams<T extends z.ZodType> {
  key: string;
  value: T;
  defaultValue?: z.infer<T>;
}

export function createMMKVSchema<T extends z.ZodType>({
  key,
  value: valueType,
  defaultValue,
}: MMKVSchemaParams<T>) {
  const setValue = (newValue: z.infer<T>) => {
    if (valueType.safeParse(newValue).success) {
      mmkvStorage.set(key, JSON.stringify(newValue));
    } else {
      throw new Error(`${key}에 대한 값이 유효하지 않습니다.`);
    }
  };

  const getValue = (): z.infer<T> | null => {
    const value = mmkvStorage.getString(key);
    if (!value) {
      return null;
    }

    const jsonParsedValue = JSON.parse(value);

    return valueType.parse(
      isStringIncludeQuotesOrDoubleQuotes(jsonParsedValue)
        ? removeQuotesOrDoubleQuotes(jsonParsedValue)
        : jsonParsedValue
    );
  };

  //defaultValue 설정 시 초기값 설정
  if (getValue() === null) {
    setValue(valueType.parse(defaultValue));
  }

  const resetValue = () => {
    mmkvStorage.delete(key);
    if (defaultValue) {
      setValue(valueType.parse(defaultValue));
    }
  };

  const useMMKV = () => {
    const [_value, _setValue] = useMMKVString(key);

    const setValue = (newValue: z.infer<T>) => {
      if (valueType.safeParse(newValue).success) {
        _setValue(JSON.stringify(newValue));
      } else {
        throw new Error(`${key}에 대한 값이 유효하지 않습니다.`);
      }
    };

    if (!_value) {
      return [null, setValue] as [
        z.infer<T> | null,
        (newValue: z.infer<T>) => void
      ];
    }

    const jsonParsedValue = JSON.parse(_value);

    const value = valueType.parse(
      isStringIncludeQuotesOrDoubleQuotes(jsonParsedValue)
        ? removeQuotesOrDoubleQuotes(jsonParsedValue)
        : jsonParsedValue
    );

    return [value, setValue] as [z.infer<T>, (newValue: z.infer<T>) => void];
  };

  return {
    setValue,
    getValue,
    key,
    resetValue,
    useMMKV,
  };
}
