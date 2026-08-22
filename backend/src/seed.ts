import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { Warehouse } from './models/warehouse.model';
import { User } from './models/user.model';
import { WarehouseName, WarehouseLocation, Role } from './types';

dotenv.config();

const warehouses = [
  { name: WarehouseName.SwiftStock, location: WarehouseLocation.ILUPEJU, capacity: 500 },
  { name: WarehouseName.PrimeStorage, location: WarehouseLocation.SANGO_TEDO, capacity: 350 },
  { name: WarehouseName.NextGen, location: WarehouseLocation.MOWE, capacity: 400 },
];

const defaultPassword = 'password123';

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB connected for seeding...\n');

    // Clear existing data
    await Warehouse.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing warehouses and users.');

    // Seed warehouses
    const createdWarehouses = await Warehouse.insertMany(warehouses);
    console.log(`Seeded ${createdWarehouses.length} warehouses:`);
    createdWarehouses.forEach((w) => {
      console.log(`  - ${w.name} (${w.location}) — capacity: ${w.capacity}`);
    });

    // Seed users: one warehouse manager per warehouse, plus a production manager and a sales rep
    const hashedPassword = await bcrypt.hash(defaultPassword, 12);

    const users = [
      {
        email: 'production@factory.com',
        password: hashedPassword,
        role: Role.PRODUCTION_MANAGER,
      },
      {
        email: 'warehouse.swift@factory.com',
        password: hashedPassword,
        role: Role.WAREHOUSE_MANAGER,
        warehouseId: createdWarehouses[0]._id,
      },
      {
        email: 'warehouse.prime@factory.com',
        password: hashedPassword,
        role: Role.WAREHOUSE_MANAGER,
        warehouseId: createdWarehouses[1]._id,
      },
      {
        email: 'warehouse.nextgen@factory.com',
        password: hashedPassword,
        role: Role.WAREHOUSE_MANAGER,
        warehouseId: createdWarehouses[2]._id,
      },
      {
        email: 'sales@factory.com',
        password: hashedPassword,
        role: Role.SALES_REP,
      },
    ];

    const createdUsers = await User.insertMany(users);
    console.log(`\nSeeded ${createdUsers.length} users (password: "${defaultPassword}"):`);
    createdUsers.forEach((u) => {
      const warehouse = u.warehouseId
        ? createdWarehouses.find((w) => w._id.equals(u.warehouseId))?.name
        : '—';
      console.log(`  - ${u.email} [${u.role}] warehouse: ${warehouse}`);
    });

    console.log('\nSeeding complete.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seed();
