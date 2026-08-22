import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Production } from './models/production.model';
import { Warehouse } from './models/warehouse.model';
import { WarehouseDistribution } from './models/warehouseDistribution.model';
import { Order } from './models/order.model';
import { ProductType, OrderStatus, DistributionStatus, WarehouseName } from './types';

dotenv.config();

// Helper to create dates spread across the last 30 days
function daysAgo(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(Math.floor(Math.random() * 12) + 8, Math.floor(Math.random() * 60), 0, 0);
  return d;
}

const customers = [
  { name: 'Oluwaseun Furniture Ltd', address: '12 Admiralty Way, Lekki Phase 1, Lagos' },
  { name: 'Adebayo Interiors', address: '35 Allen Avenue, Ikeja, Lagos' },
  { name: 'GreenBuild Construction', address: '7 Wempco Road, Ogba, Lagos' },
  { name: 'Zenith Home Solutions', address: '22 Opebi Road, Ikeja, Lagos' },
  { name: 'Tunde\'s Woodcraft', address: '9 Broad Street, Lagos Island, Lagos' },
  { name: 'Nkem Properties', address: '45 Trans Amadi, Port Harcourt, Rivers' },
  { name: 'Amina Decor Studio', address: '16 Akin Adesola Street, Victoria Island, Lagos' },
  { name: 'Kola Building Materials', address: '33 Agege Motor Road, Surulere, Lagos' },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB connected for data seeding...\n');

    // Fetch existing warehouses
    const warehouses = await Warehouse.find();
    if (warehouses.length === 0) {
      console.error('No warehouses found. Run "yarn seed" first to create warehouses and users.');
      process.exit(1);
    }
    console.log(`Found ${warehouses.length} warehouses:`);
    warehouses.forEach((w) => console.log(`  - ${w.name} (${w.location})`));

    // Clear existing data (keep users and warehouses)
    await Production.deleteMany({});
    await WarehouseDistribution.deleteMany({});
    await Order.deleteMany({});
    console.log('\nCleared existing productions, distributions, and orders.');

    // ── Productions ────────────────────────────────────────────────
    // Multiple batches across different dates for each product
    const productionBatches: Array<{ product: ProductType; amount: number; date: Date }> = [];

    const productAmounts: Record<ProductType, number[]> = {
      [ProductType.TABLE]: [150, 200, 100, 175, 120, 80, 250],
      [ProductType.CHAIR]: [300, 250, 400, 180, 350, 220, 150, 300],
      [ProductType.DOOR]: [80, 120, 60, 100, 90, 75, 110],
    };

    Object.entries(productAmounts).forEach(([product, amounts]) => {
      amounts.forEach((amount, i) => {
        productionBatches.push({
          product: product as ProductType,
          amount,
          date: daysAgo(30 - i * 4),
        });
      });
    });

    const createdProductions = await Production.insertMany(productionBatches);
    console.log(`\nSeeded ${createdProductions.length} production batches:`);

    // Summary by product
    const productTotals: Record<string, number> = {};
    createdProductions.forEach((p) => {
      productTotals[p.product] = (productTotals[p.product] || 0) + p.amount;
    });
    Object.entries(productTotals).forEach(([product, total]) => {
      console.log(`  - ${product}: ${total} total units produced`);
    });

    // ── Warehouse Distributions ────────────────────────────────────
    // Distribute some products to each warehouse (mix of SUCCESSFUL and PENDING)
    const distributionRecords: Array<{
      productionId?: mongoose.Types.ObjectId;
      warehouseId: mongoose.Types.ObjectId;
      product: ProductType;
      amount: number;
      status: DistributionStatus;
      distributedAt: Date;
    }> = [];

    const warehouseProducts: Array<{
      warehouse: WarehouseName;
      distributions: Array<{
        product: ProductType;
        amounts: number[];
        statuses: DistributionStatus[];
      }>;
    }> = [
      {
        warehouse: WarehouseName.SwiftStock,
        distributions: [
          { product: ProductType.TABLE, amounts: [60, 40, 30], statuses: [DistributionStatus.SUCCESSFUL, DistributionStatus.SUCCESSFUL, DistributionStatus.PENDING] },
          { product: ProductType.CHAIR, amounts: [80, 50, 35], statuses: [DistributionStatus.SUCCESSFUL, DistributionStatus.PENDING, DistributionStatus.PENDING] },
          { product: ProductType.DOOR, amounts: [40, 25], statuses: [DistributionStatus.SUCCESSFUL, DistributionStatus.SUCCESSFUL] },
        ],
      },
      {
        warehouse: WarehouseName.PrimeStorage,
        distributions: [
          { product: ProductType.TABLE, amounts: [45, 35, 20], statuses: [DistributionStatus.SUCCESSFUL, DistributionStatus.SUCCESSFUL, DistributionStatus.PENDING] },
          { product: ProductType.CHAIR, amounts: [70, 60, 40], statuses: [DistributionStatus.SUCCESSFUL, DistributionStatus.SUCCESSFUL, DistributionStatus.PENDING] },
          { product: ProductType.DOOR, amounts: [30, 20], statuses: [DistributionStatus.SUCCESSFUL, DistributionStatus.PENDING] },
        ],
      },
      {
        warehouse: WarehouseName.NextGen,
        distributions: [
          { product: ProductType.TABLE, amounts: [50, 30], statuses: [DistributionStatus.SUCCESSFUL, DistributionStatus.PENDING] },
          { product: ProductType.CHAIR, amounts: [90, 70, 45], statuses: [DistributionStatus.SUCCESSFUL, DistributionStatus.SUCCESSFUL, DistributionStatus.PENDING] },
          { product: ProductType.DOOR, amounts: [35, 20, 15], statuses: [DistributionStatus.SUCCESSFUL, DistributionStatus.PENDING, DistributionStatus.PENDING] },
        ],
      },
    ];

    for (const wp of warehouseProducts) {
      const warehouse = warehouses.find((w) => w.name === wp.warehouse);
      if (!warehouse) continue;

      for (const dist of wp.distributions) {
        // Pick a random production batch of this product to link
        const matchingProductions = createdProductions.filter((p) => p.product === dist.product);
        const randomProduction = matchingProductions[Math.floor(Math.random() * matchingProductions.length)];

        for (let i = 0; i < dist.amounts.length; i++) {
          distributionRecords.push({
            productionId: randomProduction._id,
            warehouseId: warehouse._id,
            product: dist.product,
            amount: dist.amounts[i],
            status: dist.statuses[i],
            distributedAt: daysAgo(25 - i * 5),
          });
        }
      }
    }

    const createdDistributions = await WarehouseDistribution.insertMany(distributionRecords);
    console.log(`\nSeeded ${createdDistributions.length} warehouse distributions:`);

    // Summary by warehouse
    const distByWarehouse: Record<string, number> = {};
    createdDistributions.forEach((d) => {
      const wName = warehouses.find((w) => w._id.equals(d.warehouseId))?.name || 'Unknown';
      distByWarehouse[wName] = (distByWarehouse[wName] || 0) + d.amount;
    });
    Object.entries(distByWarehouse).forEach(([name, total]) => {
      console.log(`  - ${name}: ${total} units distributed`);
    });

    // ── Orders ─────────────────────────────────────────────────────
    const orderRecords: Array<{
      customerName: string;
      customerAddress: string;
      product: ProductType;
      amount: number;
      warehouseId: mongoose.Types.ObjectId;
      status: OrderStatus;
    }> = [];

    // Generate 12-15 orders spread across warehouses and products
    const orderData = [
      { customer: 0, product: ProductType.TABLE, amount: 25, warehouse: WarehouseName.SwiftStock, status: OrderStatus.SUCCESSFUL },
      { customer: 1, product: ProductType.CHAIR, amount: 50, warehouse: WarehouseName.PrimeStorage, status: OrderStatus.SUCCESSFUL },
      { customer: 2, product: ProductType.DOOR, amount: 15, warehouse: WarehouseName.NextGen, status: OrderStatus.PENDING },
      { customer: 3, product: ProductType.TABLE, amount: 30, warehouse: WarehouseName.SwiftStock, status: OrderStatus.PENDING },
      { customer: 4, product: ProductType.CHAIR, amount: 40, warehouse: WarehouseName.PrimeStorage, status: OrderStatus.SUCCESSFUL },
      { customer: 5, product: ProductType.DOOR, amount: 20, warehouse: WarehouseName.NextGen, status: OrderStatus.PENDING },
      { customer: 6, product: ProductType.TABLE, amount: 15, warehouse: WarehouseName.SwiftStock, status: OrderStatus.SUCCESSFUL },
      { customer: 7, product: ProductType.CHAIR, amount: 60, warehouse: WarehouseName.PrimeStorage, status: OrderStatus.PENDING },
      { customer: 0, product: ProductType.DOOR, amount: 10, warehouse: WarehouseName.NextGen, status: OrderStatus.SUCCESSFUL },
      { customer: 2, product: ProductType.TABLE, amount: 35, warehouse: WarehouseName.SwiftStock, status: OrderStatus.PENDING },
      { customer: 4, product: ProductType.CHAIR, amount: 45, warehouse: WarehouseName.NextGen, status: OrderStatus.SUCCESSFUL },
      { customer: 6, product: ProductType.DOOR, amount: 18, warehouse: WarehouseName.PrimeStorage, status: OrderStatus.PENDING },
    ];

    for (const od of orderData) {
      const warehouse = warehouses.find((w) => w.name === od.warehouse);
      if (!warehouse) continue;

      orderRecords.push({
        customerName: customers[od.customer].name,
        customerAddress: customers[od.customer].address,
        product: od.product,
        amount: od.amount,
        warehouseId: warehouse._id,
        status: od.status,
      });
    }

    const createdOrders = await Order.insertMany(orderRecords);
    console.log(`\nSeeded ${createdOrders.length} orders:`);

    // Summary by status
    const ordersByStatus: Record<string, number> = {};
    createdOrders.forEach((o) => {
      ordersByStatus[o.status] = (ordersByStatus[o.status] || 0) + 1;
    });
    Object.entries(ordersByStatus).forEach(([status, count]) => {
      console.log(`  - ${status}: ${count} orders`);
    });

    console.log('\nData seeding complete.');
    process.exit(0);
  } catch (error) {
    console.error('Data seeding failed:', error);
    process.exit(1);
  }
};

seed();
