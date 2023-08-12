import { useState, useCallback } from 'react';
import qs from 'query-string';

/** shamelessly copy/pasted https://medium.com/swlh/81ccdfcb174f */
export default function useQueryString(key, initialValue) {
  const [value, setValue] = useState(getQueryStringValue(key) || initialValue);
  const onSetValue = useCallback(
    newValue => {
      setValue(newValue);
      setQueryStringValue(key, newValue);
    },
    [key]
  );

  return [value, onSetValue];
}

function setQueryStringWithoutPageReload(qsValue) {
  const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${qsValue}${window.location.hash}`;
  window.history.pushState({ path: newurl }, '', newurl);
}

function setQueryStringValue(key, value, queryString = window.location.search) {
  const values = qs.parse(queryString);
  let newQsValue;
  if (!value) {
    const updatedValues = { ...values };
    delete updatedValues[key];
    newQsValue = qs.stringify(updatedValues);
  } else {
    newQsValue = qs.stringify({ ...values, [key]: value });
  }
  setQueryStringWithoutPageReload(`?${newQsValue}`);
}

function getQueryStringValue(key, queryString = window.location.search) {
  const values = qs.parse(queryString);
  return values[key];
}
