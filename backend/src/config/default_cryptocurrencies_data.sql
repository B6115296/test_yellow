INSERT INTO "cryptocurrency" (name, symbol, price, "createdAt", "updatedAt") 
VALUES 
  ('Bitcoin', 'BTC', 67048.01, NOW(), NOW()),
  ('Ethereum', 'ETH', 4120.99, NOW(), NOW()),
  ('Ripple', 'XRP', 0.78, NOW(), NOW()),
  ('LUNA', 'LUNA', 0.0, NOW(), NOW())
ON CONFLICT DO NOTHING;
