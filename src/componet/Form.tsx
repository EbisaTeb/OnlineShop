import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least three characters" }),
  Age: z
    .number({ invalid_type_error: "Age field required" })
    .min(18, { message: "Age must be greater than 18 " })
    .max(80, { message: "Age must be less than  80 " }),
});

type formData = z.infer<typeof schema>;

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<formData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          className="form-control"
        />
      </div>
      {errors.name && <p className="text-danger"> {errors.name.message}</p>}

      <div className="mb-3">
        <label htmlFor="Age" className="form-label">
          Age
        </label>
        <input
          {...register("Age", { valueAsNumber: true })}
          id="Age"
          type="number"
          className="form-control"
        />
        {errors.Age && <p className="text-danger"> {errors.Age.message}</p>}
      </div>
      <button disabled={!isValid} className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}

export default Form;
