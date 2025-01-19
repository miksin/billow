
INSERT INTO users (ulid, name, role) VALUES
('alice', 'Alice', 1),
('bob', 'Bob', 0),
('charlie', 'Charlie', 0),
('dolly', 'Dolly', 0);

INSERT INTO access_tokens (userUlid, token, description, expiredAt) VALUES
('alice', 'token1', 'Alice token', '2025-12-31 23:59:59'),
('bob', 'token2', 'Bob token', '2025-12-31 23:59:59'),
('charlie', 'token3', 'Charlie token', '2025-12-31 23:59:59'),
('dolly', 'token4', 'Dolly token', '2025-12-31 23:59:59');

INSERT INTO books (ulid, name, currency, status) VALUES
('book1', 'book1', 'JPY', 1),
('book2', 'book2', 'EUR', 1);

INSERT INTO user_book_rels (userUlid, bookUlid, sum) VALUES
('alice', 'book1', 1400),
('bob', 'book1', -1300),
('charlie', 'book1', -700),
('dolly', 'book1', 600);

INSERT INTO expenses (ulid, bookUlid, cost, date, category, description, readonly, createdAt, updatedAt) VALUES
('1', 'book1', 2000, '2025-01-01', 'Food', 'Lunch', false, '2025-01-01 12:00:00', '2025-01-01 12:00:00'),
('2', 'book1', 400, '2025-01-02', 'Transport', 'Bus ticket', false, '2025-01-02 12:00:00', '2025-01-02 12:00:00'),
('3', 'book1', 600, '2025-01-03', 'Entertainment', 'Movie', false, '2025-01-03 12:00:00', '2025-01-03 12:00:00'),
('4', 'book1', 900, '2025-01-04', 'Food', 'Dinner', false, '2025-01-04 12:00:00', '2025-01-04 12:00:00');

INSERT INTO user_expense_rels (userUlid, expenseUlid, amount) VALUES
('alice', '1', 1000),
('bob', '1', -1000),
('bob', '2', 200),
('charlie', '2', -200),
('alice', '3', 400),
('bob', '3', -200),
('charlie', '3', -200),
('dolly', '4', 600),
('bob', '4', -300),
('charlie', '4', -300);