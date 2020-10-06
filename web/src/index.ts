import { User } from "./models/User";
import { UserList } from "./views/UserList";
import { UserEdit } from "./views/UserEdit";

const root = document.getElementById("root");

if (root) {
  // const userList = new UserList(root, User.buildUserCollection());
  // userList.render();

  const userEdit = new UserEdit(
    root,
    User.buildUser({ name: "Name", age: 20 })
  );
  userEdit.render();
} else {
  throw new Error("Root element not found");
}
