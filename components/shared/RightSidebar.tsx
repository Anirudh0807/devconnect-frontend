import { fetchCommunities } from "@/lib/actions/community.actions";
import CommunityCard from "../cards/CommunityCard";
import { fetchUsers } from "@/lib/actions/user.actions";
import { ClerkLoading, currentUser } from "@clerk/nextjs";
import UserCard from "../cards/UserCard";

async function RightSidebar() {
  const communitiesResult = await fetchCommunities({ pageSize: 2 });
  const user = await currentUser();

  if (!user) return null;
  const usersResult = await fetchUsers({ userId: user.id, pageSize: 3 });
  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">
          Suggested Communities
        </h3>
        {communitiesResult ? (
          <div>
            {communitiesResult.communities.length === 0 ? (
              <p className="no-result mt-4">No Result</p>
            ) : (
              <>
                {communitiesResult.communities.map((community) => (
                  <div className="mt-2">
                    <CommunityCard
                      key={community.id}
                      id={community.id}
                      name={community.name}
                      username={community.username}
                      imgUrl={community.image}
                      bio={community.bio}
                      members={community.members}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        ) : (
          <ClerkLoading />
        )}
      </div>

      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1 text-center pb-2">
          Suggested Users
        </h3>
        {usersResult ? (
          <div>
            {usersResult.users.length === 0 ? (
              <p className="no-result">No Users</p>
            ) : (
              <>
                {usersResult.users.map((person) => (
                  <div className="py-4">
                    <UserCard
                      key={person.id}
                      id={person.id}
                      name={person.name}
                      username={person.username}
                      imgUrl={person.image}
                      personType="User"
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        ) : (
          <ClerkLoading />
        )}
      </div>
    </section>
  );
}

export default RightSidebar;
