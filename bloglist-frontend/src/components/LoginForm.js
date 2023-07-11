

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
            className="mt-1 px-4 py-3  border border-orange-400 block w-1/2 rounded sm:text-sm"

          />

        </div>
        <div className="mb-4">
          password
          <input
            type="password"
            value={props.password}
            name="Password"
            onChange={props.onChangePassword}
            className="mt-1 px-4 py-3  border border-orange-400 block w-1/2 rounded sm:text-sm"

            />
        </div>
        <button className="border-solid border border-orange-400 w-24 sm:text-sm rounded p-2" type='submit'>Login</button>
      </form>
    );
  };

export default LoginForm;