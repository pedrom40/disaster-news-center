<cfcomponent>

  <cffunction name="getDS" access="private" returnType="string">
    <cfreturn 'dnc'>
  </cffunction>

  <cffunction name="sendEmail" access="private">
    <cfargument name="to" type="string" required="yes">
    <cfargument name="from" type="string" required="yes">
    <cfargument name="subject" type="string" required="yes">
    <cfargument name="msg" type="string" required="yes">

    <cfmail to="#arguments.to#" from="#arguments.from#" subject="#arguments.subject#" type="html">
      #arguments.msg#

      <cfdump var="#cgi#">
      <cfdump var="#variables#">
    </cfmail>
  </cffunction>

</cfcomponent>
