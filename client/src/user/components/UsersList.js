import React from "react";

import UserItem from "./UsersItem";
import Card from "../../shared/components/UIElememnts/Card";
import classes from "./UsersList.module.css";

export default function UsersList(props) {
  if (!props.items.length) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className={classes["users-list"]}>
      {props.items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places.length}
        />
      ))}
    </ul>
  );
}
