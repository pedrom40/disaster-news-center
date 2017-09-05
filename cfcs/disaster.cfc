<cfcomponent>

  <cffunction name="getDisaster" access="remote" returnType="string" returnFormat="json">
    <cfargument name="name" type="string" required="yes">

    <cfquery name="disasters" datasource="#getDS()#">
      SELECT id, name, center_lat, center_lon
      FROM disasters
      WHERE name = <cfqueryparam cfsqltype="cf_sql_varchar" maxLength="75" value="#arguments.name#">
    </cfquery>

    <cfset disasterInfo = ArrayNew(1)>
    <cfset disasterInfo[1] = #disasters.id#>
    <cfset disasterInfo[2] = #disasters.name#>
    <cfset disasterInfo[3] = #disasters.center_lat#>
    <cfset disasterInfo[4] = #disasters.center_lon#>

    <cfreturn #serializeJSON(disasterInfo)#>
  </cffunction>

  <cffunction name="getMapCenter" access="remote" returnType="string" returnFormat="json">
    <cfargument name="disasterID" type="numeric" required="yes">

    <cfquery name="disasters" datasource="#getDS()#">
      SELECT center_lat, center_lon
      FROM disasters
      WHERE id = <cfqueryparam cfsqltype="cf_sql_integer" maxLength="10" value="#arguments.disasterID#">
    </cfquery>

    <cfset mapCenter = ArrayNew(1)>
    <cfset mapCenter[1] = #disasters.center_lat#>
    <cfset mapCenter[2] = #disasters.center_lon#>

    <cfreturn #serializeJSON(mapCenter)#>
  </cffunction>

  <cffunction name="getLocalYouTubeChannelIds" access="remote" returnType="string" returnFormat="json">
    <cfargument name="disasterID" type="numeric" required="yes">

    <cfset disasterName = getDisasterNameFromID(arguments.disasterID)>

    <cfquery name="local_channels" datasource="#getDS()#">
      SELECT channel_id
      FROM local_youtube_channel_ids
      WHERE disaster_id = <cfqueryparam cfsqltype="cf_sql_integer" maxLength="10" value="#arguments.disasterID#">
    </cfquery>

    <cfset localChannels = ArrayNew(2)>

    <cfoutput query="local_channels">
      <cfset localChannels[#currentrow#][1] = #local_channels.channel_id#>
      <cfset localChannels[#currentrow#][2] = #disasterName#>
    </cfoutput>

    <cfreturn #serializeJSON(localChannels)#>
  </cffunction>

  <cffunction name="getNationalYouTubeChannelIds" access="remote" returnType="string" returnFormat="json">
    <cfargument name="disasterID" type="numeric" required="yes">

    <cfset disasterName = getDisasterNameFromID(arguments.disasterID)>

    <cfquery name="national_channels" datasource="#getDS()#">
      SELECT channel_id
      FROM national_youtube_channel_ids
    </cfquery>

    <cfset nationalChannels = ArrayNew(2)>

    <cfoutput query="national_channels">
      <cfset nationalChannels[#currentrow#][1] = #national_channels.channel_id#>
      <cfset nationalChannels[#currentrow#][2] = #disasterName#>
    </cfoutput>

    <cfreturn #serializeJSON(nationalChannels)#>
  </cffunction>

  <cffunction name="getAreaReports" access="remote" returnType="string" returnFormat="json">
    <cfargument name="disasterID" type="numeric" required="yes">

    <cfquery name="area_reports" datasource="#getDS()#">
      SELECT date_reported, report, reported_by
      FROM area_reports
      WHERE disaster_id = <cfqueryparam cfsqltype="cf_sql_integer" maxLength="10" value="#arguments.disasterID#">
    </cfquery>

    <cfset areaReports = ArrayNew(2)>

    <cfoutput query="area_reports">
      <cfset areaReports[#currentrow#][1] = #area_reports.date_reported#>
      <cfset areaReports[#currentrow#][2] = #area_reports.report#>
      <cfset areaReports[#currentrow#][2] = #area_reports.reported_by#>
    </cfoutput>

    <cfreturn #serializeJSON(areaReports)#>
  </cffunction>

  <cffunction name="getAffectedAreas" access="remote" returnType="string" returnFormat="json">
    <cfargument name="disasterID" type="numeric" required="yes">

    <cfquery name="affected_areas" datasource="#getDS()#">
      SELECT location, est_population
      FROM affected_areas
      WHERE disaster_id = <cfqueryparam cfsqltype="cf_sql_integer" maxLength="10" value="#arguments.disasterID#">
    </cfquery>

    <cfset affectedAreas = ArrayNew(2)>

    <cfoutput query="affected_areas">
      <cfset affectedAreas[#currentrow#][1] = #affected_areas.location#>
      <cfset affectedAreas[#currentrow#][2] = #affected_areas.est_population#>
    </cfoutput>

    <cfreturn #serializeJSON(affectedAreas)#>
  </cffunction>

  <cffunction name="getAffectedAreaCoordinates" access="remote" returnType="string" returnFormat="json">
    <cfargument name="disasterID" type="numeric" required="yes">

    <cfquery name="affected_areas" datasource="#getDS()#">
      SELECT center_lat, center_lon, location
      FROM affected_areas
      WHERE disaster_id = <cfqueryparam cfsqltype="cf_sql_integer" maxLength="10" value="#arguments.disasterID#">
    </cfquery>

    <cfset affectedAreas = ArrayNew(2)>

    <cfoutput query="affected_areas">
      <cfset affectedAreas[#currentrow#][1] = #affected_areas.center_lat#>
      <cfset affectedAreas[#currentrow#][2] = #affected_areas.center_lon#>
      <cfset affectedAreas[#currentrow#][3] = #affected_areas.location#>
    </cfoutput>

    <cfreturn #serializeJSON(affectedAreas)#>
  </cffunction>

  <cffunction name="getLocalHelpInfo" access="remote" returnType="string" returnFormat="json">
    <cfargument name="disasterID" type="numeric" required="yes">

    <cfquery name="local_help" datasource="#getDS()#">
      SELECT type, name, address, city, state, zip, phone, email, msg
      FROM local_help_information
      WHERE disaster_id = <cfqueryparam cfsqltype="cf_sql_integer" maxLength="10" value="#arguments.disasterID#">
    </cfquery>

    <cfset localHelp = ArrayNew(2)>

    <cfoutput query="local_help">
      <cfset localHelp[#currentrow#][1] = #local_help.type#>
      <cfset localHelp[#currentrow#][2] = #local_help.name#>
      <cfset localHelp[#currentrow#][3] = #local_help.address#>
      <cfset localHelp[#currentrow#][4] = #local_help.city#>
      <cfset localHelp[#currentrow#][5] = #local_help.state#>
      <cfset localHelp[#currentrow#][6] = #local_help.zip#>
      <cfset localHelp[#currentrow#][7] = #local_help.phone#>
      <cfset localHelp[#currentrow#][8] = #local_help.email#>
      <cfset localHelp[#currentrow#][9] = #local_help.msg#>
    </cfoutput>

    <cfreturn #serializeJSON(localHelp)#>
  </cffunction>

  <cffunction name="getNationalOrganizations" access="remote" returnType="string" returnFormat="json">
    <cfargument name="disasterID" type="numeric" required="yes">

    <cfquery name="national_orgs" datasource="#getDS()#">
      SELECT name, logo, link
      FROM national_organizations
      WHERE disaster_id = <cfqueryparam cfsqltype="cf_sql_integer" maxLength="10" value="#arguments.disasterID#">
    </cfquery>

    <cfset nationalOrgs = ArrayNew(2)>

    <cfoutput query="national_orgs">
      <cfset nationalOrgs[#currentrow#][1] = #national_orgs.name#>
      <cfset nationalOrgs[#currentrow#][2] = #national_orgs.logo#>
      <cfset nationalOrgs[#currentrow#][3] = #national_orgs.link#>
    </cfoutput>

    <cfreturn #serializeJSON(nationalOrgs)#>
  </cffunction>


  <cffunction name="getDS" access="private" returnType="string">
    <cfreturn 'dnc'>
  </cffunction>

  <cffunction name="getDisasterNameFromID" access="private" returnType="string">
    <cfargument name="disasterID" type="numeric" required="yes">

    <cfquery name="disaster" datasource="#getDS()#">
      SELECT name
      FROM disasters
      WHERE id = <cfqueryparam cfsqltype="cf_sql_integer" maxLength="10" value="#arguments.disasterID#">
    </cfquery>

    <cfreturn '#disaster.name#'>
  </cffunction>

</cfcomponent>
