import React from 'react';
import { useForm } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Form({ defaultValues, children, onSubmit, disabled }: any) {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={disabled}>
        <div className="grid gap-x-6 gap-y-8 mt-16">
          {React.Children.map(children, (child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register: methods.register,
                    key: child.props.name,
                  },
                })
              : child;
          })}
        </div>
      </fieldset>
    </form>
  );
}

export default Form;
