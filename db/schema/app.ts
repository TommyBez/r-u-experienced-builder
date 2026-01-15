import { relations, sql } from 'drizzle-orm'
import {
  check,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core'
import { user } from './auth'

export const property = pgTable(
  'property',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    ownerUserId: text('owner_user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index('property_owner_user_id_idx').on(table.ownerUserId)],
)

export const propertyConfiguration = pgTable(
  'property_configuration',
  {
    propertyId: uuid('property_id')
      .primaryKey()
      .references(() => property.id, { onDelete: 'cascade' }),
    schemaVersion: integer('schema_version').notNull(),
    configuration: jsonb('configuration').notNull().default({}),
    version: integer('version').notNull().default(1),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    check(
      'property_configuration_schema_version_match',
      sql`${table.schemaVersion} = ((${table.configuration} ->> 'schemaVersion')::int)`,
    ),
  ],
)

export const propertyConfigurationHistory = pgTable(
  'property_configuration_history',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    propertyId: uuid('property_id')
      .notNull()
      .references(() => property.id, { onDelete: 'cascade' }),
    version: integer('version').notNull(),
    schemaVersion: integer('schema_version').notNull(),
    configuration: jsonb('configuration').notNull(),
    changedAt: timestamp('changed_at').defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('property_configuration_history_property_version_idx').on(
      table.propertyId,
      table.version,
    ),
    index('property_configuration_history_property_id_idx').on(
      table.propertyId,
    ),
    check(
      'property_configuration_history_schema_version_match',
      sql`${table.schemaVersion} = ((${table.configuration} ->> 'schemaVersion')::int)`,
    ),
  ],
)

export const propertyRelations = relations(property, ({ many, one }) => ({
  owner: one(user, {
    fields: [property.ownerUserId],
    references: [user.id],
  }),
  configuration: one(propertyConfiguration, {
    fields: [property.id],
    references: [propertyConfiguration.propertyId],
  }),
  configurationHistory: many(propertyConfigurationHistory),
}))

export const propertyConfigurationRelations = relations(
  propertyConfiguration,
  ({ one }) => ({
    property: one(property, {
      fields: [propertyConfiguration.propertyId],
      references: [property.id],
    }),
  }),
)

export const propertyConfigurationHistoryRelations = relations(
  propertyConfigurationHistory,
  ({ one }) => ({
    property: one(property, {
      fields: [propertyConfigurationHistory.propertyId],
      references: [property.id],
    }),
  }),
)
