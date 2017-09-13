<cfcomponent>

  <cffunction name="loginUser" access="remote" returnType="string" returnFormat="json">
    <cfargument name="email" type="string" required="yes">
    <cfargument name="password" type="string" required="yes">

    <cfquery name="login_user" datasource="dnc">
      SELECT * FROM users
      WHERE email = <cfqueryparam cfsqltype="cf_sql_varchar" maxLength="45" value="#arguments.email#">
        AND password = <cfqueryparam cfsqltype="cf_sql_varchar" maxLength="45" value="#hash(arguments.password, 'md5')#">
    </cfquery>

    <cfset user = ArrayNew(1)>

    <cfif login_user.recordcount gt 0>
      <cfset user[1] = 1>
      <cfset session.user.validated = 1>
    <cfelse>
      <cfset user[1] = 0>
      <cfset session.user.validated = 0>
    </cfif>

    <cfreturn #serializeJSON(user)#>
  </cffunction>

  <cffunction name="setupUserSession" access="remote" returnType="string" returnFormat="json">
    <cfset session.user = StructNew()>
    <cfset session.user.validated = 0>
    <cfreturn #serializeJSON(session.user)#>
  </cffunction>

  <cffunction name="isUserValidated" access="remote" returnType="string" returnFormat="json">
    <cfif isdefined(session.user.validated) and session.user.validated eq 1>
      <cfreturn 1>
    <cfelseif not isdefined(session.user.validated) or session.user.validated eq 0>
      <cfreturn 0>
    </cfif>
  </cffunction>

</cfcomponent>
