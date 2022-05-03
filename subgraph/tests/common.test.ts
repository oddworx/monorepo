import { dataSource } from "@graphprotocol/graph-ts";
import { assert, dataSourceMock, test } from "matchstick-as/assembly";
import { contractAddresses } from "../src/common";

test("Mainnet Addresses", () => {
  dataSourceMock.setNetwork("mainnet");
  assert.stringEquals("mainnet", dataSource.network());
  const addresses = contractAddresses();
  assert.stringEquals(
    "0x201675fbfaaac3a51371e4c31ff73ac14cee2a5a",
    addresses.genzee
  );
  assert.stringEquals(
    "0x4095547f958593b5431c0306e81df4293991d5b3",
    addresses.oddx
  );
  assert.stringEquals(
    "0x428b6a13277116c62d751bebbc6f47011a0cdc11",
    addresses.staking
  );
  assert.stringEquals(
    "0xa0fa51F54dbab68C068a2E2c62AA72Fe334D9b09",
    addresses.foodz
  );
  dataSourceMock.resetValues();
});

test("Rinkeby Addresses", () => {
  dataSourceMock.setNetwork("rinkeby");
  const addresses = contractAddresses();
  assert.stringEquals(
    addresses.genzee,
    "0x437c88daa2c743cea3b6337e8bed2035405c5bdf"
  );
  assert.stringEquals(
    addresses.oddx,
    "0x8105ecd044887b22ae21ef9070f54171df88cd4b"
  );
  assert.stringEquals(
    addresses.staking,
    "0x135f1f45295d29cc869cdbb0ec2e404888633b51"
  );
  assert.stringEquals(
    "0x1234000000000000000000000000000000000000",
    addresses.foodz
  );
  dataSourceMock.resetValues();
});

test("Local Addresses", () => {
  dataSourceMock.setNetwork("local");
  const addresses = contractAddresses();
  assert.stringEquals(
    addresses.genzee,
    "0x5fbdb2315678afecb367f032d93f642f64180aa3"
  );
  assert.stringEquals(
    addresses.oddx,
    "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512"
  );
  assert.stringEquals(
    addresses.staking,
    "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0"
  );
  assert.stringEquals(
    "0x1234000000000000000000000000000000000000",
    addresses.foodz
  );
  dataSourceMock.resetValues();
});
