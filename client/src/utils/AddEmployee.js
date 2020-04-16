import { firestore } from "../firebase/firebase.utils";

const addEmployee = (name, customerUID) => {
  firestore
    .collection("customers")
    .doc(customerUID)
    .collection("employees")
    .set({
      name
    })
    .then(() => true)
    .catch(error => {
      console.log(error);
    });
};

export default addEmployee;
