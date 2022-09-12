-- Add this line below to create uuid extention
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- SELECT uuid_generate_v4();

-- Run this for generating created at function
-- CREATE OR REPLACE FUNCTION trigger_set_timestamp()
-- RETURNS TRIGGER AS $$
-- BEGIN
--  NEW.updated_at = NOW();
--  RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

CREATE TABLE invoice (
    id uuid DEFAULT uuid_generate_v4 (),
    invoiceId VARCHAR(6) NOT NULL,
    clientName VARCHAR(50) NOT NULL,
    clientEmail VARCHAR(200) NOT NULL,
    description VARCHAR(300),
    status VARCHAR(50) NOT NULL,
    paymentTerms INT,
    paymentDue DATE NOT NULL,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    total INT NOT NULL
    PRIMARY KEY (id)
);

CREATE TABLE items (
  id uuid DEFAULT uuid_generate_v4 (),
  PRIMARY KEY (id),
  invoice_id uuid NOT NULL,
  name VARCHAR(50) NOT NULL,
  quantity INT NOT NULL,
  price INT NOT NULL,
  CONSTRAINT fk_invoice FOREIGN KEY(invoice_id) REFERENCES invoice(id) on delete cascade
);