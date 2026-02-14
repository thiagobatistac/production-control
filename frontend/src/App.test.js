import React from 'react';

describe('App', () => {
  test('basic math test', () => {
    expect(1 + 1).toBe(2);
  });

  test('string test', () => {
    expect('Production Control System').toContain('Production');
  });

  test('array test', () => {
    const products = ['Product1', 'Product2'];
    expect(products).toHaveLength(2);
  });
});