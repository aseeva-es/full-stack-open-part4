

const LoginForm = (props) => {
   
    return (
      <form onSubmit={props.handleLogin}>
        <div>
          username
          <input
            type="text"
            value={props.username}
            name="Username"
            onChange={props.onChangeUsername}
            // onChangePassword={props.onChangePassword}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={props.password}
            name="Password"
            onChange={props.onChangePassword}
            />
        </div>
        <button type="submit">login</button>
      </form>
    );
  };

export default LoginForm;