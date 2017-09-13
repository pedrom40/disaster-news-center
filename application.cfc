<cfcomponent>
	<cfsilent>

    <cfset this.scriptprotect = true>
    <cfset this.clientManagement = true>
    <cfset this.sessionManagement = true>
    <cfset this.sessionTimeout = #createTimeSpan(7, 0, 0, 0)#>
    <cfset this.applicationTimeout = #createTimeSpan(10, 0, 0, 0)#>
    <cfset this.serverSideFormValidation = false>

  </cfsilent>
</cfcomponent>
