import React from 'react'
import { createForm, ArrayField } from '@formily/core'
import {
  FormProvider,
  createSchemaField,
  RecursionField,
  useField,
  useFieldSchema,
  observer,
} from '@formily/react'
import { Input, Space, Button } from 'antd';
import 'antd/dist/antd.css';

const form = createForm()

const ArrayItems = observer((props: any) => {
  const field = useField<ArrayField>()
  const schema = useFieldSchema()
  if (!schema) throw new Error('can not found schema object')
  return (
    <div>
      {props.value?.map((item: any, index: any) => {
        const items: any = Array.isArray(schema.items)
        ? schema.items[index] || schema.items[0]
        : schema.items
        return (
          <div key={index} style={{ marginBottom: 10 }}>
            <Space>
              <RecursionField schema={items} name={index} />
              <Button
                onClick={() => {
                  field.remove(index)
                }}
              >
                Remove
              </Button>
            </Space>
          </div>
        )
      })}
      <Button
        onClick={() => {
          field.push({})
        }}
      >
        Add
      </Button>
    </div>
  )
})

const SchemaField = createSchemaField({
  components: {
    ArrayItems,
    Input,
  },
})

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.Array name="custom" x-component="ArrayItems">
        <SchemaField.Object>
          <SchemaField.String name="input" x-component="Input" />
        </SchemaField.Object>
      </SchemaField.Array>
    </SchemaField>
  </FormProvider>
)