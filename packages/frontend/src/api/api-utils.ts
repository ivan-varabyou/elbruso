import { AxiosRequestConfig } from "axios";

import { ParameterType } from "./api-types";

type AddPayloadFunction = (config: AxiosRequestConfig, payload: unknown) => void;

export function keys<T extends Record<string, unknown>>(object: T): (keyof T)[] {
  return Object.keys(object) as (keyof T)[];
}

const addPayloadFor: Record<ParameterType, AddPayloadFunction> = {
  body: (config, body) => (config.data = body),
  query: (config, query) => (config.params = query as Record<string, string>),
  formData: (config, formData) =>
    (config.data =
      formData instanceof FormData
        ? formData
        : mapObjectToFromData(formData as Record<string, unknown>)),
  path: (config, path) =>
    (config.url = replacePathParameterInUrl(config.url!, path as Record<string, string>)),
};

function replacePathParameterInUrl(baseUrl: string, pathParameter: Record<string, string>): string {
  return Object.keys(pathParameter).reduce(
    (url, name) => url.replace(`{${name}}`, encodeURIComponent(pathParameter[name])),
    baseUrl,
  );
}

function mapObjectToFromData(object: Record<string, unknown>): FormData {
  return Object.keys(object).reduce((formData, key) => {
    const value = object[key];
    if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }
    return formData;
  }, new FormData());
}

export type AbstractApiFetchParameters = {
  [parameterType in ParameterType]?: unknown;
};

export function applyParametersToAxiosRequestConfig(
  config: AxiosRequestConfig,
  parameters: AbstractApiFetchParameters,
): void {
  keys(parameters).forEach((parameterType) => {
    const payload = parameters[parameterType];
    addPayloadFor[parameterType](config, payload);
  });
}

export function joinUrl(...parts: (string | undefined)[]): string {
  let result = "";
  parts.forEach((part) => {
    if (part == null || part.length === 0) {
      return;
    }
    const resultEndsWithSeparator = result[result.length - 1] === "/";
    const partStartWithSeparator = part[0] === "/";
    if (resultEndsWithSeparator && partStartWithSeparator) {
      part = part.substring(1);
    } else if (!resultEndsWithSeparator && !partStartWithSeparator && result.length > 0) {
      part = `/${part}`;
    }
    result += part;
  });
  return result;
}
