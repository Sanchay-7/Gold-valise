// File: src/app/api/gold/route.ts

import { NextResponse } from 'next/server';

// Conversion factor: 1 Troy Ounce is approximately 31.1035 grams
const OUNCE_TO_GRAM_CONVERSION = 31.1035;

export async function GET() {
  const apiKey = process.env.GOLD_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key is missing' },
      { status: 500 }
    );
  }

  // New GoldAPI.io headers
  const options = {
    method: 'GET',
    headers: { 'x-access-token': apiKey },
  };

  try {
    // New GoldAPI.io endpoint for Gold (XAU) in Indian Rupees (INR)
    const response = await fetch('https://www.goldapi.io/api/XAU/INR', options);

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `External API Error: ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    // The API gives price per ounce, so we convert it to price per gram
    const pricePerGram = data.price / OUNCE_TO_GRAM_CONVERSION;
    const changePerGram = data.ch / OUNCE_TO_GRAM_CONVERSION;

    // Return the data in a consistent format for our frontend
    return NextResponse.json({
        price_gram: pricePerGram,
        change_gram: changePerGram,
        percent_change: data.chp, // Percentage change is the same regardless of unit
    });

  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}