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
      SELECT date_reported, report, reported_by, report_location
      FROM area_reports
      WHERE disaster_id = <cfqueryparam cfsqltype="cf_sql_integer" maxLength="10" value="#arguments.disasterID#">
        AND approved = <cfqueryparam cfsqltype="cf_sql_integer" maxLength="1" value="1">
    </cfquery>

    <cfset areaReports = ArrayNew(2)>

    <cfoutput query="area_reports">
      <cfset areaReports[#currentrow#][1] = #area_reports.date_reported#>
      <cfset areaReports[#currentrow#][2] = #area_reports.report#>
      <cfset areaReports[#currentrow#][3] = #area_reports.reported_by#>
      <cfset areaReports[#currentrow#][4] = #area_reports.report_location#>
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


  <cffunction name="saveAreaReport" access="remote" returnType="string" returnFormat="json">
    <cfargument name="disasterId" type="numeric" required="yes">
    <cfargument name="reportedBy" type="string" required="yes">
    <cfargument name="reportLocation" type="string" required="yes">
    <cfargument name="report" type="string" required="yes">
    <cfargument name="userIpAddress" type="string" required="no">
    <cfargument name="userCity" type="string" required="no">
    <cfargument name="userState" type="string" required="no">
    <cfargument name="userCounty" type="string" required="no">
    <cfargument name="userCountry" type="string" required="no">
    <cfargument name="userLat" type="string" required="no">
    <cfargument name="userLon" type="string" required="no">
    <cfargument name="userTimezone" type="string" required="no">

    <cfset response = ArrayNew(1)>

    <cftry>

      <cfquery name="insert" datasource="#getDS()#">
        INSERT INTO area_reports (
          disaster_id,
          date_reported,
          report,
          reported_by,
          approved,
          report_location,
          user_ip_address,
          user_city,
          user_state,
          user_county,
          user_country,
          user_lat,
          user_lon,
          user_timezone
        )
        VALUES (
          <cfqueryparam cfsqltype="cf_sql_integer" maxLength="10" value="#arguments.disasterId#">,
          current_timestamp(),
          <cfqueryparam cfsqltype="cf_sql_varchar" maxLength="225" value="#arguments.report#">,
          <cfqueryparam cfsqltype="cf_sql_varchar" maxLength="45" value="#arguments.reportedBy#">,
          <cfqueryparam cfsqltype="cf_sql_integer" maxLength="10" value="0">,
          <cfqueryparam cfsqltype="cf_sql_varchar" maxLength="45" value="#arguments.reportLocation#">,
          <cfqueryparam cfsqltype="cf_sql_varchar" maxLength="45" value="#arguments.userIpAddress#">,
          <cfqueryparam cfsqltype="cf_sql_varchar" maxLength="45" value="#arguments.userCity#">,
          <cfqueryparam cfsqltype="cf_sql_varchar" maxLength="45" value="#arguments.userState#">,
          <cfqueryparam cfsqltype="cf_sql_varchar" maxLength="45" value="#arguments.userCounty#">,
          <cfqueryparam cfsqltype="cf_sql_varchar" maxLength="45" value="#arguments.userCountry#">,
          <cfqueryparam cfsqltype="cf_sql_varchar" maxLength="45" value="#arguments.userLat#">,
          <cfqueryparam cfsqltype="cf_sql_varchar" maxLength="45" value="#arguments.userLon#">,
          <cfqueryparam cfsqltype="cf_sql_varchar" maxLength="45" value="#arguments.userTimezone#">
        )
      </cfquery>

      <cfquery name="newRecord" datasource="#getDS()#">
        SELECT MAX(id) AS last_record_id
        FROM area_reports
      </cfquery>

      <cfset response[1] = 'success'>
      <cfset response[2] = #newRecord.last_record_id#>

      <cfcatch type="any">
        <cfset response[1] = 'error'>
        <cfset response[2] = '#cfcatch.message# #cfcatch.detail#'>

        <cfset argumentValues = '
          <strong>Error: #response[2]#</strong><br><br>

          disasterId: #arguments.disasterId#<br>
          reportedBy: #arguments.reportedBy#<br>
          reportLocation: #arguments.reportLocation#<br>
          report: #arguments.report#<br>
          userIpAddress: #arguments.userIpAddress#<br>
          userCity: #arguments.userCity#<br>
          userState: #arguments.userState#<br>
          userCounty: #arguments.userCounty#<br>
          userCountry: #arguments.userCountry#<br>
          userLat: #arguments.userLat#<br>
          userLon: #arguments.userLon#<br>
          userTimezone: #arguments.userTimezone#<br>
        '>

        <cfset sendErrorEmail = sendEmail("webmaster@hurricaneharveynewscenter.com", "error@hurricaneharveynewscenter.com", "An error occurred during saveAreaReport", "#argumentValues#")>

      </cfcatch>

    </cftry>

    <cfreturn #serializeJSON(response)#>
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
