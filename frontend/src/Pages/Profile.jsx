import React from "react";
import api from "../api/axios";

class Profile extends React.Component {
  state = {
    profile: null,
  };

  componentDidMount() {
    api.get("profiles/1/")
      .then((res) => {
        this.setState({
          profile: res.data,
        });
      })
      .catch((err) => console.log(err));
  }
  
  saveProfile=()=>{

api.patch(
`profiles/${this.state.profile.id}/`,
this.state.profile
)

.then((res) => {
  this.setState({
    profile: res.data,
  });

  alert("Profile Updated");
})
.catch((err) => {
  console.log(err.response?.data);
});


}

  render() {
    const profile = this.state.profile;

    if (!profile) {
      return <h2>Loading...</h2>;
    }

    return (
      <div>
        {profile.avatar ? (
  <img
    src={`http://127.0.0.1:8000${profile.avatar}`}
    alt="Profile"
    className="w-32 h-32 rounded-full"
  />
) : (
  <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
    No Photo
  </div>
)}


        <h2>{profile.username}</h2>
        <input
    value={profile.bio || ""}
    onChange={(e)=>
        this.setState({
            profile:{
                ...profile,
                bio:e.target.value
            }
        })
    }
/>

<input
  value={profile.website || ""}
  onChange={(e) =>
    this.setState({
      profile: {
        ...profile,
        website: e.target.value,
      },
    })
  }
/>
<button onClick={this.saveProfile}>
Save Profile
</button>
<input
type="file"
onChange={(e)=>{

const form=new FormData();

form.append(
"avatar",
e.target.files[0]
);

api.patch(
  `profiles/${this.state.profile.id}/`,
  form,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
).then((res) => {
  this.setState({
    profile: res.data,
  });
});


}}
/>

        <p>{profile.bio}</p>

        <p>{profile.website}</p>

      </div>
    );
  }
}

export default Profile;