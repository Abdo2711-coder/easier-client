import React, { useState } from "react";
import Input from "components/formik/Input";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "next-i18next";
import Button from "components/UI/Button";
import FileInput from "components/formik/FileInput";

const EditProfileForm = ({ session }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");

  const { t } = useTranslation("common");

  const onSubmit = async (values) => {
    console.log(values);
  };

  const initialValues = {
    username: "",
    phoneNumber: "",
    email: "",
    image: "",
  };

  const editProfileValidation = Yup.object().shape({
    username: Yup.string().required(t("username is required")).trim(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={editProfileValidation}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form className="flex flex-col items-center justify-around gap-8 sm:m-5 lg:flex-row">
            <div className="mb-12 flex flex-col items-center justify-center">
              <FileInput
                label={
                  <div className="user__image-box relative h-32 w-32 shrink-0 cursor-pointer overflow-hidden rounded-full shadow-lg outline outline-1 outline-offset-4 outline-gray-400 sm:h-48 sm:w-48">
                    <img
                      src={
                        image
                          ? URL.createObjectURL(image)
                          : "/images/building-1.jpg"
                      }
                      className="user__image block h-full w-full scale-105 object-cover object-center transition-all duration-500"
                    />
                    <span className="user__edit translate-y-1/5 absolute  top-1/2 left-1/2 -translate-x-1/2 text-center text-sm text-white opacity-0 transition-all duration-500 md:text-lg">
                      {t("change your image")}
                    </span>
                  </div>
                }
                className={"mb-8"}
                onChange={async (event) => {
                  formik.setFieldValue("image", event.currentTarget.files[0]);
                  setImage(event.currentTarget.files[0]);
                }}
              />
              <p className="text-center text-xs text-gray-500 sm:text-sm">
                {t("allowed *.jpeg, *.jpg, *.png, *.gif")} <br></br>{" "}
                {t("max size of 3.1 MB")}
              </p>
            </div>

            <div className="w-full lg:w-2/5">
              <Input
                label={t("username")}
                name="username"
                type="text"
                placeholder={t("username")}
                className={"w-full"}
              />
              <Input
                label={t("phone number")}
                name="phoneNumber"
                type="text"
                placeholder={t("phone number")}
                className={"w-full"}
              />
              <Input
                label={t("email")}
                name="email"
                type="email"
                placeholder={t("email")}
                className={"w-full"}
              />
              <Button
                disabled={isLoading}
                className="mx-auto mt-6 flex w-full items-center justify-center"
                type="submit"
              >
                {isLoading ? (
                  <>
                    <Spinner className="mr-3 h-4 w-4 rtl:ml-3" /> {t("loading")}
                  </>
                ) : (
                  t("update")
                )}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditProfileForm;