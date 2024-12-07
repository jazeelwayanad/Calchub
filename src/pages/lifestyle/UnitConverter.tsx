import React, { useState } from 'react';
import { Calculator } from '../../components/Calculator';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Result } from '../../components/Result';

type UnitType = 'length' | 'weight' | 'temperature';

interface UnitConversion {
  from: string;
  to: string;
  value: string;
}

export function UnitConverter() {
  const [unitType, setUnitType] = useState<UnitType>('length');
  const [conversion, setConversion] = useState<UnitConversion>({
    from: 'meters',
    to: 'feet',
    value: '',
  });
  const [result, setResult] = useState<number | null>(null);

  const unitOptions = {
    length: ['meters', 'feet', 'inches', 'kilometers', 'miles'],
    weight: ['kilograms', 'pounds', 'ounces', 'grams'],
    temperature: ['celsius', 'fahrenheit', 'kelvin'],
  };

  const conversionFactors: Record<string, Record<string, number>> = {
    meters: { feet: 3.28084, inches: 39.3701, kilometers: 0.001, miles: 0.000621371 },
    feet: { meters: 0.3048, inches: 12, kilometers: 0.0003048, miles: 0.000189394 },
    kilograms: { pounds: 2.20462, ounces: 35.274, grams: 1000 },
    pounds: { kilograms: 0.453592, ounces: 16, grams: 453.592 },
  };

  const handleConvert = () => {
    const value = parseFloat(conversion.value);
    if (!value) return;

    let result: number;

    if (unitType === 'temperature') {
      result = convertTemperature(value, conversion.from, conversion.to);
    } else {
      result = convertUnit(value, conversion.from, conversion.to);
    }

    setResult(result);
  };

  const convertTemperature = (value: number, from: string, to: string): number => {
    if (from === to) return value;

    let celsius: number;
    
    // Convert to Celsius first
    switch (from) {
      case 'fahrenheit':
        celsius = (value - 32) * (5/9);
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
      default:
        celsius = value;
    }

    // Convert from Celsius to target
    switch (to) {
      case 'fahrenheit':
        return (celsius * 9/5) + 32;
      case 'kelvin':
        return celsius + 273.15;
      default:
        return celsius;
    }
  };

  const convertUnit = (value: number, from: string, to: string): number => {
    if (from === to) return value;
    return value * (conversionFactors[from]?.[to] ?? 1);
  };

  return (
    <Calculator
      title="Unit Converter"
      description="Convert between different units of measurement."
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Conversion Type
            </label>
            <select
              value={unitType}
              onChange={(e) => setUnitType(e.target.value as UnitType)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="length">Length</option>
              <option value="weight">Weight</option>
              <option value="temperature">Temperature</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">From</label>
              <select
                value={conversion.from}
                onChange={(e) => setConversion({ ...conversion, from: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {unitOptions[unitType].map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">To</label>
              <select
                value={conversion.to}
                onChange={(e) => setConversion({ ...conversion, to: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {unitOptions[unitType].map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Input
            label="Value"
            type="number"
            value={conversion.value}
            onChange={(e) => setConversion({ ...conversion, value: e.target.value })}
            placeholder={`Enter ${conversion.from} value`}
          />

          <Button onClick={handleConvert} className="w-full">
            Convert
          </Button>
        </div>

        {result !== null && (
          <div className="space-y-6">
            <Result
              label={`Result (${conversion.to})`}
              value={result.toFixed(4)}
            />

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Common Conversions</h3>
              <div className="space-y-2 text-blue-800">
                {unitType === 'length' && (
                  <>
                    <p>• 1 meter = 3.28084 feet</p>
                    <p>• 1 kilometer = 0.621371 miles</p>
                    <p>• 1 inch = 2.54 centimeters</p>
                  </>
                )}
                {unitType === 'weight' && (
                  <>
                    <p>• 1 kilogram = 2.20462 pounds</p>
                    <p>• 1 pound = 16 ounces</p>
                    <p>• 1 gram = 0.035274 ounces</p>
                  </>
                )}
                {unitType === 'temperature' && (
                  <>
                    <p>• 0°C = 32°F</p>
                    <p>• 100°C = 212°F</p>
                    <p>• 0°C = 273.15K</p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Calculator>
  );
}